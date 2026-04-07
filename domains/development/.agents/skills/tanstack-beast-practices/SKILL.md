---
name: tanstack-beast-practices
description: TanStack (Query v5, Table v8, Virtual v3): кэширование, инвалидация, пагинация, infinite scroll, серверные фильтры/сортировка, виртуализация больших списков. Используй этот скилл при любой работе с TanStack Query, TanStack Table или TanStack Virtual — при написании fetcher-слоя, настройке кэша, построении таблиц с серверной пагинацией, виртуальных списков и при вопросах «как правильно сделать X с TanStack».
---

# Skill: TanStack Beast Practices

Копипаст-паттерны для предсказуемой работы с данными, таблицами и виртуализацией.

> [!IMPORTANT]
> **MCP-приоритет:** Если доступен MCP-сервер `tanstack-docs`, **всегда используй его инструменты** (`tanstack_doc`, `tanstack_search_docs`, `listTanStackAddOns`, `getAddOnDetails`, `createTanStackApplication`) **первыми** — они дают актуальную документацию прямо из официальных источников TanStack. Используй паттерны этого скилла как fallback или как дополнительный контекст по архитектуре (fetcher/adapter/hook, queryKey factory, оптимистичные обновления, виртуализация), когда MCP недоступен или не содержит нужной информации.

**Разделы:**
1. [Query: архитектура fetcher/adapter](#1-query-архитектура)
2. [Query: кэширование и staleTime](#2-query-кэш)
3. [Query: мутации и инвалидация](#3-query-мутации)
4. [Query: пагинация и infinite scroll](#4-query-пагинация)
5. [Table: серверная пагинация/сортировка/фильтры](#5-table)
6. [Virtual: большие списки](#6-virtual)

---

## 1. Query: Архитектура

### ✅ DO: отдельные слои fetcher → adapter → hook
```ts
// ─── 1. fetcher: чистый HTTP, без бизнес-логики ───────────────────
// src/api/users.api.ts
export async function fetchUsersApi(params: UsersQueryParams): Promise<UsersApiResponse> {
  const qs = new URLSearchParams(params as any).toString();
  const res = await fetch(`/api/users?${qs}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// ─── 2. adapter: маппинг API-модели → доменную ────────────────────
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
    queryKey: ["users", params],          // ключ включает параметры
    queryFn:  () => fetchUsersApi(params),
    select:   data => data.items.map(adaptUser), // transform здесь, не в компоненте
  });
}
```

### ✅ DO: queryKey factory — один источник правды для ключей
```ts
// src/api/users.keys.ts
export const userKeys = {
  all:     ()          => ["users"]                    as const,
  lists:   ()          => [...userKeys.all(), "list"]  as const,
  list:    (p: Params) => [...userKeys.lists(), p]     as const,
  details: ()          => [...userKeys.all(), "detail"] as const,
  detail:  (id: string)=> [...userKeys.details(), id]  as const,
};

// Использование:
useQuery({ queryKey: userKeys.list(params), queryFn: ... });

// Инвалидация всех списков разом:
qc.invalidateQueries({ queryKey: userKeys.lists() });

// ❌ Плохо: магические строки разбросаны по компонентам
useQuery({ queryKey: ["users", "list", page], ... }); // дублирование и опечатки
```

---

## 2. Query: Кэш

### ✅ DO: осознанно выставлять staleTime и gcTime
```ts
// src/lib/queryClient.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,   // данные свежие 1 минуту — нет лишних фетчей при навигации
      gcTime:    5 * 60 * 1000, // мусор собирается через 5 минут
      retry: 2,
      refetchOnWindowFocus: false, // отключи если данные не real-time
    },
  },
});

// ✅ Переопределение для конкретного хука
export function useUserProfile(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn:  () => fetchUserProfile(id),
    staleTime: 5 * 60 * 1000, // профиль меняется редко — кэш 5 минут
  });
}

// ✅ Real-time данные — без кэша
export function useLiveStats() {
  return useQuery({
    queryKey: ["live-stats"],
    queryFn:  fetchLiveStats,
    staleTime: 0,               // всегда stale
    refetchInterval: 5000,      // поллинг каждые 5 секунд
  });
}
```

### ✅ DO: prefetch для предзагрузки при ховере
```ts
function UserLink({ userId }: { userId: string }) {
  const qc = useQueryClient();

  return (
    <a
      href={`/users/${userId}`}
      onMouseEnter={() => {
        // ✅ Предзагружаем данные до клика — переход кажется мгновенным
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

## 3. Query: Мутации и Инвалидация

### ✅ DO: оптимистичное обновление + rollback
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

    // ✅ Оптимистично обновляем кэш ДО ответа сервера
    onMutate: async (data) => {
      await qc.cancelQueries({ queryKey: userKeys.detail(data.id) });

      const previous = qc.getQueryData<User>(userKeys.detail(data.id));
      qc.setQueryData(userKeys.detail(data.id), (old: User) => ({ ...old, ...data }));

      return { previous }; // контекст для rollback
    },

    // ✅ Откат при ошибке
    onError: (_err, data, ctx) => {
      if (ctx?.previous) {
        qc.setQueryData(userKeys.detail(data.id), ctx.previous);
      }
    },

    // ✅ Синхронизация с сервером в любом случае
    onSettled: (_data, _err, data) => {
      qc.invalidateQueries({ queryKey: userKeys.detail(data.id) });
    },
  });
}
```

### ✅ DO: инвалидация нескольких ключей после мутации
```ts
export function useDeleteUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/users/${id}`, { method: "DELETE" }).then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
      }),

    onSuccess: (_data, id) => {
      // ✅ Инвалидируем список И детальную страницу
      qc.invalidateQueries({ queryKey: userKeys.lists() });
      qc.removeQueries({ queryKey: userKeys.detail(id) }); // удаляем из кэша совсем
    },
  });
}
```

---

## 4. Query: Пагинация и Infinite Scroll

### ✅ DO: серверная пагинация через keepPreviousData
```ts
export function useUsersList(page: number, pageSize = 20) {
  return useQuery({
    queryKey: userKeys.list({ page, pageSize }),
    queryFn:  () => fetchUsersApi({ page, pageSize }),
    placeholderData: keepPreviousData, // ✅ нет "мигания" при смене страницы
    staleTime: 30 * 1000,
  });
}

// Использование в компоненте
function UsersTable() {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useUsersList(page);

  return (
    <>
      {isFetching && <Spinner size="sm" />} {/* индикатор без блокировки UI */}
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

### ✅ DO: infinite scroll через useInfiniteQuery
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

  // ✅ IntersectionObserver — грузим следующую страницу при достижении конца
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

### ✅ DO: серверная пагинация + сортировка + фильтры
```ts
// ─── State: URL как источник правды для фильтров/пагинации ─────────
function useTableState() {
  const [sorting,    setSorting]    = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 20 });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  return { sorting, setSorting, pagination, setPagination, columnFilters, setColumnFilters };
}

// ─── Параметры запроса из состояния таблицы ────────────────────────
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

// ─── Таблица ───────────────────────────────────────────────────────
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
    manualSorting:    true, // ✅ серверная сортировка
    manualPagination: true, // ✅ серверная пагинация
    manualFiltering:  true, // ✅ серверная фильтрация
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

### ❌ DON'T: клиентская сортировка/пагинация на больших данных
```ts
// ❌ Плохо: грузим всё, потом сортируем в браузере
useQuery({ queryFn: () => fetchAllUsers() }); // 10к+ записей в памяти браузера
// ✅ manualSorting + manualPagination + серверный запрос с параметрами
```

---

## 6. Virtual

### ✅ DO: useVirtualizer для длинных списков
```tsx
import { useVirtualizer } from "@tanstack/react-virtual";

function VirtualUsersList({ users }: { users: User[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count:            users.length,
    getScrollElement: () => parentRef.current,
    estimateSize:     () => 56,   // примерная высота строки в px
    overscan:         5,          // рендерим 5 строк за экраном (плавность)
  });

  return (
    <div ref={parentRef} style={{ height: "600px", overflowY: "auto" }}>
      {/* контейнер полной высоты — браузер рисует правильный scrollbar */}
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

### ✅ DO: динамические высоты строк через measureElement
```tsx
const virtualizer = useVirtualizer({
  count:            items.length,
  getScrollElement: () => parentRef.current,
  estimateSize:     () => 80,
  measureElement:   el => el.getBoundingClientRect().height, // ✅ реальная высота
});

// В рендере строки:
<div ref={virtualizer.measureElement} data-index={vRow.index}>
  <VariableHeightRow item={items[vRow.index]} />
</div>
```

### ✅ DO: виртуализация таблицы (комбо Table + Virtual)
```tsx
// ✅ Получаем строки из TanStack Table, виртуализируем через Virtual
const rows = table.getRowModel().rows;

const rowVirtualizer = useVirtualizer({
  count:            rows.length,
  getScrollElement: () => tableContainerRef.current,
  estimateSize:     () => 40,
  overscan:         10,
});

// Рендерим только видимые строки:
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

### Правило выбора: пагинация vs виртуализация
| Сценарий | Решение |
|---|---|
| Таблица с навигацией, SEO, закладками на страницу | Серверная пагинация |
| Лента/список без чёткого понятия "страница" | Infinite scroll |
| Dropdown с поиском, 1000+ опций | Виртуализация |
| Таблица с 10k+ строк без пагинации | Виртуализация |
| Смешанный UX: таблица + докрутка до конца | Table + Virtual |

---

## См. также
- `react-beast-practices` → виртуализация (базовый пример)
- `typescript-beast-practices` → типизация generic запросов
- `dev-reference-snippets` → раздел 6 (базовые примеры useQuery/useMutation)
