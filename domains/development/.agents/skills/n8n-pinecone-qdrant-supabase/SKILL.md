---
name: n8n-pinecone-qdrant-supabase
description: Паттерны интеграции n8n (автоматизация workflows) с векторными БД Pinecone и Qdrant и с Supabase (PostgreSQL + Auth + Storage + Realtime). Используй этот скилл при построении AI-пайплайнов, RAG-систем, автоматизации данных, работе с эмбеддингами, семантическом поиске, или любой оркестрации между этими инструментами. Активируй при вопросах про n8n workflows, векторный поиск, upsert эмбеддингов, Supabase RLS, или построение RAG поверх этого стека.
---

# Skill: n8n + Pinecone + Qdrant + Supabase

Паттерны для построения AI-пайплайнов, RAG-систем и автоматизаций на этом стеке.

**Разделы:**
1. [n8n: паттерны workflows](#1-n8n-workflows)
2. [Pinecone: upsert, поиск, namespace-стратегия](#2-pinecone)
3. [Qdrant: коллекции, payload-фильтры, поиск](#3-qdrant)
4. [Supabase: pgvector, RLS, Realtime](#4-supabase)
5. [RAG-пайплайн: полный пример](#5-rag-пайплайн)
6. [n8n + Supabase: типичные интеграции](#6-n8n--supabase)
7. [DO/DON'T: частые ошибки](#7-частые-ошибки)

---

## 1. n8n Workflows

### ✅ DO: структура надёжного workflow
```
Trigger → Validate → Transform → Action → Error Handler
```

- **Trigger**: Webhook, Schedule, DB-событие, Supabase Realtime
- **Validate**: проверяй входные данные сразу — не пускай мусор дальше
- **Transform**: Code-ноды для сложной логики, Set-ноды для простого маппинга
- **Action**: HTTP Request / нативная нода / вызов внешнего API
- **Error Handler**: всегда вешай на workflow — иначе упавший run молча исчезнет

### ✅ DO: Code-нода для трансформаций (JS)
```js
// n8n Code node — обрабатывает все items
const results = [];

for (const item of $input.all()) {
  const { text, sourceId, metadata } = item.json;

  // ✅ Ранняя проверка — пропускаем невалидные items
  if (!text || typeof text !== "string") {
    continue; // или: throw new Error(`Item ${sourceId}: missing text`);
  }

  results.push({
    json: {
      id:       sourceId,
      content:  text.trim().slice(0, 8000), // ✅ обрезаем до лимита эмбеддинга
      metadata: {
        ...metadata,
        processedAt: new Date().toISOString(),
      },
    },
  });
}

return results;
```

### ✅ DO: разбивать большие документы на чанки
```js
// Code node: chunking с overlap
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
    start += chunkSize - overlap; // ✅ overlap сохраняет контекст на стыках
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

### ✅ DO: обработка ошибок в workflow
```
1. Settings → Error Workflow → указать отдельный error-workflow
2. В error-workflow: получаем $execution.error → логируем в Supabase/Slack
3. Для HTTP Request нод: включай "Continue on Fail" + проверяй статус в следующей ноде
```

```js
// Code node: проверка ответа HTTP Request
const response = $input.first().json;

if (response.error || response.statusCode >= 400) {
  throw new Error(`API error: ${response.statusCode} — ${JSON.stringify(response.error)}`);
}

return [{ json: response }];
```

### ✅ DO: environment variables для секретов
```
Settings → Variables → добавить PINECONE_API_KEY, SUPABASE_URL и т.д.
В нодах: {{ $vars.PINECONE_API_KEY }}
❌ Никогда не хардкодить ключи прямо в ноды
```

---

## 2. Pinecone

### ✅ DO: стратегия namespace
```
namespace = tenant или категория данных

Примеры:
  "user_123"          → персональные данные пользователя
  "docs_product"      → документация по продукту
  "kb_support"        → база знаний поддержки
  ""                  → дефолтный namespace (не смешивай с именованными)
```

### ✅ DO: upsert эмбеддингов (HTTP Request нода в n8n)
```js
// Code node: подготовка батча для Pinecone upsert
const items = $input.all();

const vectors = items.map(item => ({
  id:       item.json.id,          // уникальный string ID
  values:   item.json.embedding,   // float[] от модели эмбеддинга
  metadata: {
    // ✅ Только примитивы: string, number, boolean, string[]
    text:       item.json.text.slice(0, 1000), // Pinecone лимит metadata ~40KB
    sourceUrl:  item.json.sourceUrl,
    docId:      item.json.docId,
    chunkIndex: item.json.chunkIndex,
    updatedAt:  new Date().toISOString(),
  },
}));

// Возвращаем батчами по 100 (лимит Pinecone upsert)
const batchSize = 100;
const batches = [];
for (let i = 0; i < vectors.length; i += batchSize) {
  batches.push({ json: { vectors: vectors.slice(i, i + batchSize) } });
}

return batches;
```

```json
// HTTP Request нода: POST https://YOUR_INDEX.svc.YOUR_ENV.pinecone.io/vectors/upsert
// Headers: Api-Key: {{ $vars.PINECONE_API_KEY }}, Content-Type: application/json
// Body: { "vectors": {{ $json.vectors }}, "namespace": "docs_product" }
```

### ✅ DO: семантический поиск с фильтрами
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
// Code node: обработка результатов поиска
const matches = $input.first().json.matches ?? [];

// ✅ Фильтруем по score — отсекаем слабые совпадения
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

### ✅ DO: удаление устаревших векторов
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

### ✅ DO: создание коллекции с правильными параметрами
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
  Cosine   → нормализованные эмбеддинги (OpenAI, text-embedding-*)  ✅ чаще всего
  Dot      → не нормализованные, максимизируем скалярное произведение
  Euclid   → когда важно абсолютное расстояние
```

### ✅ DO: upsert точек с payload
```js
// Code node: подготовка для Qdrant upsert
const points = $input.all().map(item => ({
  id:      item.json.id,         // ✅ uint64 или UUID string
  vector:  item.json.embedding,
  payload: {
    text:       item.json.text,
    docId:      item.json.docId,
    chunkIndex: item.json.chunkIndex,
    sourceUrl:  item.json.sourceUrl,
    language:   item.json.language ?? "ru",
    createdAt:  Math.floor(Date.now() / 1000), // ✅ unix timestamp для range-фильтров
  },
}));

return [{ json: { points } }];
```

```json
// PUT /collections/documents/points
// Body: { "points": {{ $json.points }} }
```

### ✅ DO: поиск с payload-фильтрами
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

### ✅ DO: scroll для экспорта / батч-обновлений
```json
// POST /collections/documents/points/scroll
// Используй когда нужно перебрать ВСЕ точки без векторного поиска
{
  "limit":        100,
  "with_payload": true,
  "with_vector":  false,
  "filter": {
    "must": [{ "key": "docId", "match": { "value": "manual_v1" } }]
  },
  "offset": null
}
// Следующая страница: "offset": last_result.next_page_offset
```

### ✅ DO: именованные векторы для multi-modal поиска
```json
// Коллекция с несколькими векторами на точку
{
  "vectors": {
    "text":  { "size": 1536, "distance": "Cosine" },
    "image": { "size": 512,  "distance": "Cosine" }
  }
}

// Поиск только по text-вектору:
// POST /collections/docs/points/search
{ "vector": { "name": "text", "vector": [...] }, "limit": 5 }
```

---

## 4. Supabase

### ✅ DO: pgvector для семантического поиска прямо в Postgres
```sql
-- Включить расширение (один раз)
create extension if not exists vector;

-- Таблица с эмбеддингами
create table documents (
  id          uuid primary key default gen_random_uuid(),
  content     text        not null,
  embedding   vector(1536),          -- размер под модель
  metadata    jsonb        default '{}',
  user_id     uuid         references auth.users(id),
  created_at  timestamptz  default now()
);

-- ✅ HNSW индекс — быстрее IVFFlat для большинства случаев
create index on documents
  using hnsw (embedding vector_cosine_ops)
  with (m = 16, ef_construction = 64);

-- Функция семантического поиска
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

### ✅ DO: RLS — изоляция данных по пользователю
```sql
-- ✅ Включить RLS на таблице
alter table documents enable row level security;

-- Пользователь видит только свои документы
create policy "users_own_documents"
  on documents for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Сервисный ключ (service_role) обходит RLS — используй только на бэкенде/n8n
-- Anon/authenticated ключ — подчиняется RLS — используй на клиенте
```

### ✅ DO: вызов match_documents из n8n (HTTP Request)
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

### ✅ DO: Supabase Realtime как триггер для n8n
```
Supabase → Database Webhooks → при INSERT/UPDATE в таблицу → POST на n8n Webhook URL

Настройка в Supabase Dashboard:
  Database → Webhooks → Create Webhook
    Table:  documents
    Events: INSERT
    URL:    https://YOUR_N8N.com/webhook/process-document
    HTTP Method: POST
```

### ✅ DO: Storage для файлов + метаданные в БД
```js
// n8n HTTP Request: загрузка файла в Supabase Storage
// POST https://YOUR_PROJECT.supabase.co/storage/v1/object/documents/{{ $json.fileName }}
// Headers: apikey, Authorization, Content-Type: application/octet-stream
// Body: бинарный файл

// После загрузки — сохранить метаданные в БД
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

## 5. RAG-пайплайн

### ✅ DO: полный ingestion-пайплайн в n8n
```
[Trigger: Webhook/Schedule]
        ↓
[Fetch Document] — HTTP/Supabase Storage
        ↓
[Extract Text] — Code нода (PDF→text, HTML→text)
        ↓
[Chunk Text] — Code нода (1000 chars, overlap 200)
        ↓
[Get Embeddings] — HTTP → OpenAI /v1/embeddings (батч по 20)
        ↓
[Upsert to Vector DB] — Pinecone или Qdrant
        ↓
[Save Metadata] — Supabase REST (статус, chunk count, docId)
        ↓
[Notify] — Slack/Email/Webhook
```

### ✅ DO: query-пайплайн (retrieval + generation)
```
[Trigger: Webhook {question, userId}]
        ↓
[Embed Question] — OpenAI /v1/embeddings
        ↓
[Vector Search] — Pinecone/Qdrant/Supabase match_documents
        ↓
[Filter & Rank] — Code нода: score >= 0.75, top 5
        ↓
[Build Prompt] — Code нода: собираем context + question
        ↓
[LLM Generation] — OpenAI /v1/chat/completions
        ↓
[Format Response] — Code нода: answer + sources
        ↓
[Save to History] — Supabase (вопрос, ответ, источники)
        ↓
[Return Response] — Respond to Webhook
```

```js
// Code нода: построение RAG-промпта
const question = $input.first().json.question;
const chunks   = $input.first().json.matches; // из vector search

const context = chunks
  .map((c, i) => `[${i + 1}] ${c.text}`)
  .join("\n\n");

const messages = [
  {
    role: "system",
    content: `Ты помощник. Отвечай ТОЛЬКО на основе предоставленного контекста.
Если ответа нет в контексте — скажи "Информация не найдена".
Контекст:
${context}`,
  },
  {
    role: "user",
    content: question,
  },
];

return [{ json: { messages } }];
```

### ✅ DO: гибридный поиск (vector + full-text)
```sql
-- Supabase: объединяем семантический и полнотекстовый поиск (RRF fusion)
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

### ✅ DO: CRUD через Supabase REST API
```js
// Code нода: построение запроса с фильтрами
const { userId, status, limit = 20, offset = 0 } = $input.first().json;

// ✅ Supabase PostgREST фильтры
const params = new URLSearchParams({
  user_id: `eq.${userId}`,
  ...(status && { status: `eq.${status}` }),
  order:  "created_at.desc",
  limit:  limit.toString(),
  offset: offset.toString(),
});

return [{ json: { queryString: params.toString() } }];

// HTTP Request: GET /rest/v1/documents?{{ $json.queryString }}
// Headers: apikey, Authorization, Range: 0-19 (для пагинации)
// ✅ Prefer: count=exact — вернёт Content-Range заголовок с total count
```

### ✅ DO: upsert с conflict resolution
```json
// POST /rest/v1/documents
// Headers: Prefer: resolution=merge-duplicates
{
  "id":         "{{ $json.docId }}",
  "content":    "{{ $json.content }}",
  "updated_at": "{{ $now }}"
}
// ✅ merge-duplicates — обновит существующий, создаст новый если нет
// ignore-duplicates — пропустит если уже есть
```

### ✅ DO: слушать Realtime через n8n Webhook
```
Supabase Realtime → Database Webhook → n8n:

Сценарии:
  INSERT в tasks      → запустить processing workflow
  UPDATE status='done' → отправить уведомление пользователю  
  DELETE в documents  → удалить эмбеддинги из Pinecone/Qdrant
```

### ✅ DO: управление ошибками + retry
```js
// Code нода после HTTP Request к Supabase
const { statusCode, body } = $input.first().json;

if (statusCode === 409) {
  // Конфликт — запись уже существует, это OK
  return [{ json: { status: "already_exists", ...body } }];
}

if (statusCode >= 400) {
  // ✅ Кидаем с деталями — попадёт в error workflow
  throw new Error(`Supabase error ${statusCode}: ${JSON.stringify(body)}`);
}

return [{ json: { status: "ok", data: body } }];
```

---

## 7. Частые ошибки

### ❌ DON'T: смешивать service_role ключ с anon ключом
```
service_role → обходит RLS, полный доступ → только бэкенд/n8n ✅
anon         → подчиняется RLS, ограниченный → клиентский код ✅

❌ service_role в браузере/мобильном приложении — утечка = полный доступ к БД
❌ anon в n8n для операций требующих обхода RLS — будет 403
```

### ❌ DON'T: хранить весь текст в metadata Pinecone
```
❌ Pinecone metadata limit ~40KB на вектор
❌ Медленный фильтр по длинным строкам

✅ Храни в metadata только: id, короткий preview (200 chars), теги, даты
✅ Полный текст — в Supabase/PostgreSQL, достаём по id после поиска
```

### ❌ DON'T: upsert по одному вектору в цикле
```js
// ❌ Плохо: N HTTP-запросов вместо одного
for (const item of items) {
  await upsert(item); // 1000 items = 1000 запросов
}

// ✅ Батчевый upsert
// Pinecone: до 100 векторов за раз
// Qdrant:   до 1000 точек за раз (wait=false для async)
// В n8n: Split In Batches нода → HTTP Request
```

### ❌ DON'T: игнорировать размерность эмбеддингов
```
OpenAI text-embedding-3-small  → 1536 dims (или меньше через dimensions param)
OpenAI text-embedding-3-large  → 3072 dims
OpenAI text-embedding-ada-002  → 1536 dims

❌ Создать коллекцию на 1536, залить ada-002, потом переключиться на 3-large (3072) — ошибка
✅ Зафиксируй модель и размер в конфиге, не меняй без пересоздания коллекции
```

### ❌ DON'T: запускать workflow без идемпотентности
```js
// ❌ Плохо: повторный запуск задваивает данные
// ✅ Всегда используй upsert, не insert
// ✅ Добавляй идемпотентный ключ (docId + chunkIndex → детерминированный ID)

// ✅ Детерминированный ID для чанка (одинаковый при повторном запуске)
function makeChunkId(docId, chunkIndex) {
  return `${docId}_chunk_${chunkIndex}`;
}
// Pinecone: id = makeChunkId(...)
// Qdrant:   id = uuid5(namespace, makeChunkId(...)) — если нужен UUID
```

### ❌ DON'T: игнорировать лимиты rate limit
```
OpenAI Embeddings: 3000 RPM (tier 1) → батчи + задержка между запросами
Pinecone upsert:   100 vectors/request, ~100 RPS
Supabase REST:     зависит от плана, по умолчанию 500 req/s

✅ В n8n: Split In Batches + Wait нода между батчами
✅ Для больших объёмов: Queue (Redis) или n8n Sub-workflows с троттлингом
```

---

## См. также
- `dev-reference-snippets` — Express API, валидация, обработка ошибок
- `es2025-beast-practices` — async/await паттерны, Promise.all для параллельных запросов
