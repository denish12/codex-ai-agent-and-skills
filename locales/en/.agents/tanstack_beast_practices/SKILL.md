---
name: tanstack_beast_practices
description: TanStack (Query v5, Table v8, Virtual v3): caching, invalidation, pagination, infinite scroll, server filters/sorting, virtualization for large lists. Use this skill with any work involving TanStack Query, TanStack Table, or TanStack Virtual ? writing the fetcher layer, setting up cache, building a table with server pagination, virtual lists, and questions like "how to do X correctly with TanStack".
---

# Skill: TanStack Beast Practices

Copy-paste patterns for predictable work with data, tables, and virtualization.

**Sections:**
1. [Query: architecture fetcher/adapter](#1-query-architecture)
2. [Query: caching and staleTime](#2-query-cache)
3. [Query: mutations and invalidation](#3-query-mutations)
4. [Query: pagination and infinite scroll](#4-query-pagination)
5. [Table: server-side pagination/sorting/filters](#5-table)
6. [Virtual: large lists](#6-virtual)

---

## 1. Query: Architecture

### ? DO: separate layers fetcher ? adapter ? hook
```ts
// ─── 1. fetcher: clean HTTP, without business logic ───────────────────
// src/api/users.api.ts
export async function fetchUsersApi(params: UsersQueryParams): Promise<UsersApiResponse> {
  const qs = new URLSearchParams(params as any).toString();
  const res = await fetch(`/api/users?${qs}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// ─── 2. adapter: mapping API-models → domain ────────────────────
// src/api/users.adapter.ts
export function adaptUser(raw: UserApiModel): User {
  return {
    id:        raw.user_id,          // snake_case → camelCase
    fullName:  `${raw.first_name} ${raw.last_name}`,
    createdAt: new Date(raw.created_at),
  };
}

// ─── 3. hook: queryKey + queryFn + transform ──────────────────────
// src/hooks/useUsers.ts
export function useUsers(params: UsersQueryParams) {
  return useQuery({
    queryKey: ["users", params],          // key includes parameters
    queryFn:  () => fetchUsersApi(params),
    select:   data => data.items.map(adaptUser), // transform here, not in component
  });
}
```

### ✅ DO: queryKey factory — one source truth for keys
```ts
// src/api/users.keys.ts
export const userKeys = {
  all:     ()          => ["users"]                    as const,
  lists:   ()          => [...userKeys.all(), "list"]  as const,
  list:    (p: Params) => [...userKeys.lists(), p]     as const,
  details: ()          => [...userKeys.all(), "detail"] as const,
  detail:  (id: string)=> [...userKeys.details(), id]  as const,
};

// Usage:
useQuery({ queryKey: userKeys.list(params), queryFn: ... });

// Invalidation all lists at once:
qc.invalidateQueries({ queryKey: userKeys.lists() });

// ? Bad: magic strings scattered across components
useQuery({ queryKey: ["users", "list", page], ... }); // duplication and typos
```

---

## 2. Query: Cache

### ? DO: intentionally set staleTime and gcTime
```ts
// src/lib/queryClient.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,   // data stays fresh for 1 minute ? no extra fetches during navigation
      gcTime:    5 * 60 * 1000, // garbage is collected after 5 minutes
      retry: 2,
      refetchOnWindowFocus: false, // disable if data is not real-time
    },
  },
});

// ? Override for a specific hook
export function useUserProfile(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn:  () => fetchUserProfile(id),
    staleTime: 5 * 60 * 1000, // profile changes rarely ? cache 5 minutes
  });
}

// ✅ Real-time data — without cache
export function useLiveStats() {
  return useQuery({
    queryKey: ["live-stats"],
    queryFn:  fetchLiveStats,
    staleTime: 0,               // always stale
    refetchInterval: 5000,      // polling every 5 seconds
  });
}
```

### ? DO: prefetch for preload on hover
```ts
function UserLink({ userId }: { userId: string }) {
  const qc = useQueryClient();

  return (
    <a
      href={`/users/${userId}`}
      onMouseEnter={() => {
        // ? Preload data before click ? transition feels instant
        qc.prefetchQuery({
          queryKey: userKeys.detail(userId),
          queryFn:  () => fetchUserProfile(userId),
          staleTime: 60 * 1000,
        });
      }}
    >
      View Profile
    </a>
  );
}
```

---

## 3. Query: Mutations and Invalidation

### ? DO: optimistic update + rollback
```ts
export function useUpdateUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserDto) =>
      fetch(`/api/users/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); }),

    // ? Optimistically update cache before the server responds
    onMutate: async (data) => {
      await qc.cancelQueries({ queryKey: userKeys.detail(data.id) });

      const previous = qc.getQueryData<User>(userKeys.detail(data.id));
      qc.setQueryData(userKeys.detail(data.id), (old: User) => ({ ...old, ...data }));

      return { previous }; // context for rollback
    },

    // ? Rollback on error
    onError: (_err, data, ctx) => {
      if (ctx?.previous) {
        qc.setQueryData(userKeys.detail(data.id), ctx.previous);
      }
    },

    // ? Synchronize with the server in any case
    onSettled: (_data, _err, data) => {
      qc.invalidateQueries({ queryKey: userKeys.detail(data.id) });
    },
  });
}
```

### ✅ DO: invalidation several keys after mutations
```ts
export function useDeleteUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/users/${id}`, { method: "DELETE" }).then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
      }),

    onSuccess: (_data, id) => {
      // ? Invalidate list and detail page
      qc.invalidateQueries({ queryKey: userKeys.lists() });
      qc.removeQueries({ queryKey: userKeys.detail(id) }); // remove from cache entirely
    },
  });
}
```

---

## 4. Query: Pagination and Infinite Scroll

### ✅ DO: server-side pagination via keepPreviousData
```ts
export function useUsersList(page: number, pageSize = 20) {
  return useQuery({
    queryKey: userKeys.list({ page, pageSize }),
    queryFn:  () => fetchUsersApi({ page, pageSize }),
    placeholderData: keepPreviousData, // ? no "flicker" between pages
    staleTime: 30 * 1000,
  });
}

// Usage in component
function UsersTable() {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useUsersList(page);

  return (
    <>
      {isFetching && <Spinner size="sm" />} {/* indicator without block UI */}
      <Table rows={data?.items ?? []} />
      <Pagination
        current={page}
        total={data?.meta.total ?? 0}
        onChange={setPage}
      />
    </>
  );
}
```

### ✅ DO: infinite scroll via useInfiniteQuery
```ts
export function useInfiniteUsers(search: string) {
  return useInfiniteQuery({
    queryKey:     userKeys.list({ search }),
    queryFn:      ({ pageParam }) => fetchUsersApi({ search, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: last => last.meta.nextCursor ?? undefined,
    staleTime: 60 * 1000,
  });
}

function InfiniteUsersList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteUsers("");
  const ref = useRef<HTMLDivElement>(null);

  // ? IntersectionObserver ? load the next page upon reaching the end
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && hasNextPage) fetchNextPage(); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const users = data?.pages.flatMap(p => p.items) ?? [];

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.fullName}</li>)}
      <div ref={ref}>
        {isFetchingNextPage && <Spinner />}
      </div>
    </ul>
  );
}
```

---

## 5. Table

### ✅ DO: server-side pagination + sorting + filters
```ts
// ─── State: URL how source truth for filter/pagination ─────────
function useTableState() {
  const [sorting,    setSorting]    = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 20 });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  return { sorting, setSorting, pagination, setPagination, columnFilters, setColumnFilters };
}

// ─── Parameters request from states tables ────────────────────────
function tableStateToQueryParams(
  sorting: SortingState,
  pagination: PaginationState,
  columnFilters: ColumnFiltersState
): UsersQueryParams {
  return {
    page:     pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy:   sorting[0]?.id,
    sortDir:  sorting[0]?.desc ? "desc" : "asc",
    ...Object.fromEntries(columnFilters.map(f => [f.id, f.value])),
  };
}

// ─── Table ───────────────────────────────────────────────────────
const columns: ColumnDef<User>[] = [
  { accessorKey: "fullName", header: "Name", enableSorting: true },
  { accessorKey: "email",    header: "Email", enableColumnFilter: true },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ getValue }) => getValue<Date>().toLocaleDateString("ru-RU"),
  },
];

function UsersDataTable() {
  const ts = useTableState();
  const params = tableStateToQueryParams(ts.sorting, ts.pagination, ts.columnFilters);
  const { data, isFetching } = useUsersList(params);

  const table = useReactTable({
    data:        data?.items ?? [],
    columns,
    rowCount:    data?.meta.total ?? 0,
    state:       { sorting: ts.sorting, pagination: ts.pagination, columnFilters: ts.columnFilters },
    manualSorting:    true, // ✅ server-side sorting
    manualPagination: true, // ✅ server-side pagination
    manualFiltering:  true, // ✅ server-side filtering
    onSortingChange:       ts.setSorting,
    onPaginationChange:    ts.setPagination,
    onColumnFiltersChange: ts.setColumnFilters,
    getCoreRowModel:       getCoreRowModel(),
  });

  return (
    <div>
      {isFetching && <div className="loading-bar" />}
      <table>
        <thead>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {hg.headers.map(h => (
                <th key={h.id} onClick={h.column.getToggleSortingHandler()}>
                  {flexRender(h.column.columnDef.header, h.getContext())}
                  {h.column.getIsSorted() === "asc" ? " ↑" : h.column.getIsSorted() === "desc" ? " ↓" : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>←</button>
        <span>Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>→</button>
      </div>
    </div>
  );
}
```

### ❌ DON'T: client sorting/pagination on large data
```ts
// ? Bad: load everything, then sort in the browser
useQuery({ queryFn: () => fetchAllUsers() }); // 10k+ records in browser memory
// ✅ manualSorting + manualPagination + server request with parameters
```

---

## 6. Virtual

### ✅ DO: useVirtualizer for long lists
```tsx
import { useVirtualizer } from "@tanstack/react-virtual";

function VirtualUsersList({ users }: { users: User[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count:            users.length,
    getScrollElement: () => parentRef.current,
    estimateSize:     () => 56,   // approximate row height in px
    overscan:         5,          // render 5 rows outside the screen (smoothness)
  });

  return (
    <div ref={parentRef} style={{ height: "600px", overflowY: "auto" }}>
      {/* container with full height ? browser renders the correct scrollbar */}
      <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
        {virtualizer.getVirtualItems().map(vRow => (
          <div
            key={vRow.index}
            style={{
              position:  "absolute",
              top:       vRow.start,
              width:     "100%",
              height:    vRow.size,
            }}
          >
            <UserRow user={users[vRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

### ✅ DO: dynamic heights lines via measureElement
```tsx
const virtualizer = useVirtualizer({
  count:            items.length,
  getScrollElement: () => parentRef.current,
  estimateSize:     () => 80,
  measureElement:   el => el.getBoundingClientRect().height, // ? real height
});

// In rendering lines:
<div ref={virtualizer.measureElement} data-index={vRow.index}>
  <VariableHeightRow item={items[vRow.index]} />
</div>
```

### ? DO: virtualize tables (Table + Virtual combo)
```tsx
// ? We take rows from TanStack Table and virtualize them via Virtual
const rows = table.getRowModel().rows;

const rowVirtualizer = useVirtualizer({
  count:            rows.length,
  getScrollElement: () => tableContainerRef.current,
  estimateSize:     () => 40,
  overscan:         10,
});

// Render only visible rows:
{rowVirtualizer.getVirtualItems().map(vRow => {
  const row = rows[vRow.index];
  return (
    <tr key={row.id} style={{ height: vRow.size, transform: `translateY(${vRow.start}px)` }}>
      {row.getVisibleCells().map(cell => (
        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
      ))}
    </tr>
  );
})}
```

### Rule choice: pagination vs virtualization
| Scenario | Decision |
|---|---|
| Table with navigation, SEO, bookmarks per page | Server-side pagination |
| Feed/list without a clear concept of a "page" | Infinite scroll |
| Dropdown with search, 1000+ options | Virtualization |
| Table with 10k+ lines without pagination | Virtualization |
| Mixed UX: table + scroll to the end | Table + Virtual |

---

## See also
- `react_beast_practices` → virtualization (baseline example)
- `typescript_beast_practices` → typing generic requests
- `dev_reference_snippets` → section 6 (basic examples useQuery/useMutation)
