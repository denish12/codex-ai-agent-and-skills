---
name: n8n_pinecone_qdrant_supabase
description: Integration patterns for n8n (automation workflows) with vector DBs Pinecone and Qdrant, and with Supabase (PostgreSQL + Auth + Storage + Realtime). Use this skill when building AI pipelines, RAG systems, automation data flows, working with embeddings, semantic search, or any orchestration between these tools. Activate for questions about n8n workflows, vector search, embedding upserts, Supabase RLS, or building RAG on top of this stack.
---

# Skill: n8n + Pinecone + Qdrant + Supabase

Patterns for building AI pipelines, RAG systems, and automations on this stack.

**Sections:**
1. [n8n: patterns workflows](#1-n8n-workflows)
2. [Pinecone: upsert, search, namespace-strategy](#2-pinecone)
3. [Qdrant: collections, payload-filters, search](#3-qdrant)
4. [Supabase: pgvector, RLS, Realtime](#4-supabase)
5. [RAG-pipeline: full example](#5-rag-pipeline)
6. [n8n + Supabase: typical integrations](#6-n8n--supabase)
7. [DO/DON'T: common errors](#7-common errors)

---

## 1. n8n Workflows

### ✅ DO: structure reliable workflow
```
Trigger → Validate → Transform → Action → Error Handler
```

- **Trigger**: Webhook, Schedule, DB-event, Supabase Realtime
- **Validate**: check input data immediately ? do not let garbage pass further
- **Transform**: Code nodes for complex logic, Set nodes for simple mapping
- **Action**: HTTP Request / native butyes / call external API
- **Error Handler**: always attach it to the workflow ? otherwise a failed run disappears silently

### ✅ DO: Code-butyes for transformations (JS)
```js
// n8n Code node — handles all items
const results = [];

for (const item of $input.all()) {
  const { text, sourceId, metadata } = item.json;

  // ? Early check ? skip invalid items
  if (!text || typeof text !== "string") {
    continue; // or: throw new Error(`Item ${sourceId}: missing text`);
  }

  results.push({
    json: {
      id:       sourceId,
      content:  text.trim().slice(0, 8000), // ? trim to the embedding limit
      metadata: {
        ...metadata,
        processedAt: new Date().toISOString(),
      },
    },
  });
}

return results;
```

### ? DO: split large documents into chunks
```js
// Code node: chunking with overlap
function chunkText(text, chunkSize = 1000, overlap = 200) {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push({
      text:       text.slice(start, end),
      chunkIndex: chunks.length,
      startChar:  start,
      endChar:    end,
    });
    start += chunkSize - overlap; // ? overlap preserves context at chunk boundaries
  }

  return chunks;
}

const { content, docId, metadata } = $input.first().json;
const chunks = chunkText(content);

return chunks.map((chunk, i) => ({
  json: {
    id:      `${docId}_chunk_${i}`,
    text:    chunk.text,
    metadata: { ...metadata, docId, chunkIndex: i, totalChunks: chunks.length },
  },
}));
```

### ✅ DO: handling errors in workflow
```
1. Settings → Error Workflow → specify separate error-workflow
2. In error-workflow: we get $execution.error → log in Supabase/Slack
3. For HTTP Request nodes: enable "Continue on Fail" + check the status in the next node
```

```js
// Code node: check answer HTTP Request
const response = $input.first().json;

if (response.error || response.statusCode >= 400) {
  throw new Error(`API error: ${response.statusCode} — ${JSON.stringify(response.error)}`);
}

return [{ json: response }];
```

### ✅ DO: environment variables for secrets
```
Settings → Variables → add PINECONE_API_KEY, SUPABASE_URL and etc.etc.
In nodes: {{ $vars.PINECONE_API_KEY }}
❌ Never not hardcode key directly in nodes
```

---

## 2. Pinecone

### ✅ DO: strategy namespace
```
namespace = tenant or category data

Examples:
  "user_123"          ? user personal data
  "docs_product"      ? product documentation
  "kb_support"        ? support knowledge base
  ""                  ? default namespace (do not mix with named ones)
```

### ✅ DO: upsert embeddings (HTTP Request butyes in n8n)
```js
// Code node: batch preparation for Pinecone upsert
const items = $input.all();

const vectors = items.map(item => ({
  id:       item.json.id,          // unique string ID
  values:   item.json.embedding,   // float[] from models embedding
  metadata: {
    // ? Only primitives: string, number, boolean, string[]
    text:       item.json.text.slice(0, 1000), // Pinecone limit metadata ~40KB
    sourceUrl:  item.json.sourceUrl,
    docId:      item.json.docId,
    chunkIndex: item.json.chunkIndex,
    updatedAt:  new Date().toISOString(),
  },
}));

// Return in batches by 100 (limit Pinecone upsert)
const batchSize = 100;
const batches = [];
for (let i = 0; i < vectors.length; i += batchSize) {
  batches.push({ json: { vectors: vectors.slice(i, i + batchSize) } });
}

return batches;
```

```json
// HTTP Request node: POST https://YOUR_INDEX.svc.YOUR_ENV.pinecone.io/vectors/upsert
// Headers: Api-Key: {{ $vars.PINECONE_API_KEY }}, Content-Type: application/json
// Body: { "vectors": {{ $json.vectors }}, "namespace": "docs_product" }
```

### ✅ DO: semantic search with filters
```json
// POST /query
{
  "vector":          "{{ $json.queryEmbedding }}",
  "topK":            10,
  "namespace":       "docs_product",
  "includeMetadata": true,
  "filter": {
    "docId":     { "$eq": "manual_v2" },
    "updatedAt": { "$gte": "2024-01-01" }
  }
}
```

```js
// Code node: handling results search
const matches = $input.first().json.matches ?? [];

// ? Filter by score ? filter out weak matches
const relevant = matches
  .filter(m => m.score >= 0.75)
  .map(m => ({
    text:      m.metadata.text,
    score:     m.score,
    sourceUrl: m.metadata.sourceUrl,
    chunkIndex: m.metadata.chunkIndex,
  }));

return [{ json: { matches: relevant, count: relevant.length } }];
```

### ? DO: remove stale vectors
```json
// POST /vectors/delete
{
  "filter":    { "docId": { "$eq": "manual_v1" } },
  "namespace": "docs_product",
  "deleteAll": false
}
```

---

## 3. Qdrant

### ✅ DO: creation collections with rule parameters
```json
// PUT /collections/documents
{
  "vectors": {
    "size":     1536,
    "distance": "Cosine"
  },
  "optimizers_config": {
    "default_segment_number": 2
  },
  "replication_factor": 1
}
```

```
distance:
  Cosine   ? normalized embeddings (OpenAI, text-embedding-*)  ? most common
  Dot      ? not normalized, maximize the dot product
  Euclid   ? when absolute distance matters
```

### ✅ DO: upsert points with payload
```js
// Code node: preparation for Qdrant upsert
const points = $input.all().map(item => ({
  id:      item.json.id,         // ✅ uint64 or UUID string
  vector:  item.json.embedding,
  payload: {
    text:       item.json.text,
    docId:      item.json.docId,
    chunkIndex: item.json.chunkIndex,
    sourceUrl:  item.json.sourceUrl,
    language:   item.json.language ?? "ru",
    createdAt:  Math.floor(Date.now() / 1000), // ✅ unix timestamp for range-filter
  },
}));

return [{ json: { points } }];
```

```json
// PUT /collections/documents/points
// Body: { "points": {{ $json.points }} }
```

### ✅ DO: search with payload-filters
```json
// POST /collections/documents/points/search
{
  "vector":       "{{ $json.queryEmbedding }}",
  "limit":        10,
  "with_payload": true,
  "filter": {
    "must": [
      { "key": "language", "match": { "value": "ru" } },
      { "key": "createdAt", "range": { "gte": 1704067200 } }
    ],
    "must_not": [
      { "key": "docId", "match": { "value": "draft_123" } }
    ]
  },
  "score_threshold": 0.70
}
```

### ? DO: scroll for export / batch updates
```json
// POST /collections/documents/points/scroll
// Use when you need to iterate through all points without vector search
{
  "limit":        100,
  "with_payload": true,
  "with_vector":  false,
  "filter": {
    "must": [{ "key": "docId", "match": { "value": "manual_v1" } }]
  },
  "offset": null
}
// Next page: "offset": last_result.next_page_offset
```

### ✅ DO: named vector for multi-modal search
```json
// Collection with multiple vectors per point
{
  "vectors": {
    "text":  { "size": 1536, "distance": "Cosine" },
    "image": { "size": 512,  "distance": "Cosine" }
  }
}

// Search only by text-vector:
// POST /collections/docs/points/search
{ "vector": { "name": "text", "vector": [...] }, "limit": 5 }
```

---

## 4. Supabase

### ✅ DO: pgvector for semantic search directly in Postgres
```sql
-- Enable the extension (one time)
create extension if not exists vector;

-- Table with embeddings
create table documents (
  id          uuid primary key default gen_random_uuid(),
  content     text        not null,
  embedding   vector(1536),          -- size under model
  metadata    jsonb        default '{}',
  user_id     uuid         references auth.users(id),
  created_at  timestamptz  default now()
);

-- ? HNSW index ? faster than IVFFlat for most cases
create index on documents
  using hnsw (embedding vector_cosine_ops)
  with (m = 16, ef_construction = 64);

-- Function semantic search
create or replace function match_documents(
  query_embedding vector(1536),
  match_threshold float  default 0.75,
  match_count     int    default 10,
  filter_user_id  uuid   default null
)
returns table (
  id         uuid,
  content    text,
  metadata   jsonb,
  similarity float
)
language sql stable
as $$
  select
    id,
    content,
    metadata,
    1 - (embedding <=> query_embedding) as similarity
  from documents
  where
    (filter_user_id is null or user_id = filter_user_id)
    and 1 - (embedding <=> query_embedding) > match_threshold
  order by embedding <=> query_embedding
  limit match_count;
$$;
```

### ? DO: RLS ? isolate data by user
```sql
-- ✅ Enable RLS on table
alter table documents enable row level security;

-- User sees only own documents
create policy "users_own_documents"
  on documents for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Service key (service_role) bypasses RLS ? use only on the backend/n8n
-- Anon/authenticated key — follows RLS — use on client
```

### ✅ DO: call match_documents from n8n (HTTP Request)
```json
// POST https://YOUR_PROJECT.supabase.co/rest/v1/rpc/match_documents
// Headers:
//   apikey: {{ $vars.SUPABASE_SERVICE_KEY }}
//   Authorization: Bearer {{ $vars.SUPABASE_SERVICE_KEY }}
//   Content-Type: application/json
{
  "query_embedding":  "{{ $json.embedding }}",
  "match_threshold":  0.75,
  "match_count":      10,
  "filter_user_id":   null
}
```

### ? DO: Supabase Realtime as a trigger for n8n
```
Supabase → Database Webhooks → with INSERT/UPDATE in table → POST on n8n Webhook URL

Setup in Supabase Dashboard:
  Database → Webhooks → Create Webhook
    Table:  documents
    Events: INSERT
    URL:    https://YOUR_N8N.com/webhook/process-document
    HTTP Method: POST
```

### ✅ DO: Storage for files + metadata in Db
```js
// n8n HTTP Request: upload a file to Supabase Storage
// POST https://YOUR_PROJECT.supabase.co/storage/v1/object/documents/{{ $json.fileName }}
// Headers: apikey, Authorization, Content-Type: application/octet-stream
// Body: binary file

// After loading — save metadata in Db
// POST /rest/v1/document_metadata
{
  "file_path":   "documents/{{ $json.fileName }}",
  "bucket":      "documents",
  "size_bytes":  "{{ $json.fileSize }}",
  "mime_type":   "{{ $json.mimeType }}",
  "uploaded_by": "{{ $json.userId }}"
}
```

---

## 5. RAG-pipeline

### ✅ DO: full ingestion-pipeline in n8n
```
[Trigger: Webhook/Schedule]
        ↓
[Fetch Document] — HTTP/Supabase Storage
        ↓
[Extract Text] — Code butyes (PDF→text, HTML→text)
        ↓
[Chunk Text] — Code butyes (1000 chars, overlap 200)
        ↓
[Get Embeddings] ? HTTP ? OpenAI /v1/embeddings (batch of 20)
        ↓
[Upsert to Vector DB] — Pinecone or Qdrant
        ↓
[Save Metadata] — Supabase REST (status, chunk count, docId)
        ↓
[Notify] — Slack/Email/Webhook
```

### ✅ DO: query-pipeline (retrieval + generation)
```
[Trigger: Webhook {question, userId}]
        ↓
[Embed Question] — OpenAI /v1/embeddings
        ↓
[Vector Search] — Pinecone/Qdrant/Supabase match_documents
        ↓
[Filter & Rank] — Code node: score >= 0.75, top 5
        ↓
[Build Prompt] ? Code node: assemble context + question
        ↓
[LLM Generation] — OpenAI /v1/chat/completions
        ↓
[Format Response] — Code node: answer + sources
        ↓
[Save to History] — Supabase (question, response, sources)
        ↓
[Return Response] — Respond to Webhook
```

```js
// Code node: building RAG-prompt
const question = $input.first().json.question;
const chunks   = $input.first().json.matches; // from vector search

const context = chunks
  .map((c, i) => `[${i + 1}] ${c.text}`)
  .join("\n\n");

const messages = [
  {
    role: "system",
    content: `You are an assistant. Respond only on the basis of the provided context.
If the answer is not in the context ? say "Information not found".
Context:
${context}`,
  },
  {
    role: "user",
    content: question,
  },
];

return [{ json: { messages } }];
```

### ? DO: hybrid search (vector + full-text)
```sql
-- Supabase: combine semantic and full-text search (RRF fusion)
create or replace function hybrid_search(
  query_text      text,
  query_embedding vector(1536),
  match_count     int default 10
)
returns table (id uuid, content text, score float)
language sql stable as $$
  with semantic as (
    select id, content,
           1 - (embedding <=> query_embedding) as score,
           row_number() over (order by embedding <=> query_embedding) as rank
    from documents
    limit 50
  ),
  fulltext as (
    select id, content,
           ts_rank(to_tsvector('russian', content), plainto_tsquery('russian', query_text)) as score,
           row_number() over (order by score desc) as rank
    from documents
    where to_tsvector('russian', content) @@ plainto_tsquery('russian', query_text)
    limit 50
  )
  -- Reciprocal Rank Fusion
  select
    coalesce(s.id, f.id) as id,
    coalesce(s.content, f.content) as content,
    coalesce(1.0/(60 + s.rank), 0) + coalesce(1.0/(60 + f.rank), 0) as score
  from semantic s
  full outer join fulltext f on s.id = f.id
  order by score desc
  limit match_count;
$$;
```

---

## 6. n8n + Supabase

### ✅ DO: CRUD via Supabase REST API
```js
// Code node: building request with filters
const { userId, status, limit = 20, offset = 0 } = $input.first().json;

// ✅ Supabase PostgREST filters
const params = new URLSearchParams({
  user_id: `eq.${userId}`,
  ...(status && { status: `eq.${status}` }),
  order:  "created_at.desc",
  limit:  limit.toString(),
  offset: offset.toString(),
});

return [{ json: { queryString: params.toString() } }];

// HTTP Request: GET /rest/v1/documents?{{ $json.queryString }}
// Headers: apikey, Authorization, Range: 0-19 (for pagination)
// ? Prefer: count=exact ? returns a Content-Range header with total count
```

### ✅ DO: upsert with conflict resolution
```json
// POST /rest/v1/documents
// Headers: Prefer: resolution=merge-duplicates
{
  "id":         "{{ $json.docId }}",
  "content":    "{{ $json.content }}",
  "updated_at": "{{ $now }}"
}
// ? merge-duplicates ? updates existing rows, creates new ones if needed
// ignore-duplicates ? skips if it already exists
```

### ? DO: listen to Realtime via an n8n Webhook
```
Supabase Realtime → Database Webhook → n8n:

Scenarios:
  INSERT in tasks      → run processing workflow
  UPDATE status='done' ? send a notification to the user  
  DELETE in documents  → delete embeddings from Pinecone/Qdrant
```

### ✅ DO: management error + retry
```js
// Code butyes after HTTP Request to Supabase
const { statusCode, body } = $input.first().json;

if (statusCode === 409) {
  // Conflict — record already exists, this OK
  return [{ json: { status: "already_exists", ...body } }];
}

if (statusCode >= 400) {
  // ? Throw with detail ? will end up in the error workflow
  throw new Error(`Supabase error ${statusCode}: ${JSON.stringify(body)}`);
}

return [{ json: { status: "ok", data: body } }];
```

---

## 7. Common errors

### ❌ DON'T: mix service_role key with anon key
```
service_role ? bypasses RLS, full access ? backend/n8n only ?
anon         ? follows RLS, limited ? client code ?

? service_role in a browser/mobile application ? leak = full DB access
? anon in n8n for operations requiring RLS bypass ? will return 403
```

### ❌ DON'T: store entire text in metadata Pinecone
```
❌ Pinecone metadata limit ~40KB on vector
? Slow filtering on long strings

? Store in metadata only: id, short preview (200 chars), tags, dates
? Full text ? in Supabase/PostgreSQL, fetch by id after search
```

### ? DON'T: upsert one vector at a time in a loop
```js
// ❌ Bad: N HTTP-requests instead of one
for (const item of items) {
  await upsert(item); // 1000 items = 1000 requests
}

// ? Batched upsert
// Pinecone: to 100 vectors for times
// Qdrant:   to 1000 points for times (wait=false for async)
// In n8n: Split In Batches butyes → HTTP Request
```

### ? DON'T: ignore embedding dimensionality
```
OpenAI text-embedding-3-small  → 1536 dims (or less via dimensions param)
OpenAI text-embedding-3-large  → 3072 dims
OpenAI text-embedding-ada-002  → 1536 dims

? Create a collection at 1536, load ada-002, then switch later to 3-large (3072) ? error
? Record model and size in config, do not change them without recreating collections
```

### ❌ DON'T: run workflow without idempotency
```js
// ? Bad: repeated runs duplicate data
// ✅ Always use upsert, not insert
// ✅ Add idempotency key (docId + chunkIndex → deterministic ID)

// ? Deterministic ID for a chunk (same on repeated startup)
function makeChunkId(docId, chunkIndex) {
  return `${docId}_chunk_${chunkIndex}`;
}
// Pinecone: id = makeChunkId(...)
// Qdrant:   id = uuid5(namespace, makeChunkId(...)) — if needed UUID
```

### ❌ DON'T: ignore limits rate limit
```
OpenAI Embeddings: 3000 RPM (tier 1) ? batches + delay between requests
Pinecone upsert:   100 vectors/request, ~100 RPS
Supabase REST:     depends on the plan, by default 500 req/s

✅ In n8n: Split In Batches + Wait butyes between in batches
? For large volumes: Queue (Redis) or n8n sub-workflows with throttling
```

---

## See also
- `dev_reference_snippets` — Express API, validation, handling errors
- `es2025_beast_practices` — async/await patterns, Promise.all for parallel requests
