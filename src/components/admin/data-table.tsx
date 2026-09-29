import Link from "next/link";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type Column<T> = {
  key: string;
  header: string;
  className?: string;
  cell: (row: T) => React.ReactNode;
};

/** Server-rendered table with optional search box and page links via URL params. */
export function DataTable<T extends { id: string }>({
  rows,
  columns,
  empty = "データがありません",
  search,
  pagination,
}: {
  rows: T[];
  columns: Column<T>[];
  empty?: string;
  search?: { placeholder: string; value: string; basePath: string };
  pagination?: { page: number; pageSize: number; total: number; basePath: string; q?: string };
}) {
  return (
    <div className="space-y-3">
      {search && (
        <form action={search.basePath} method="get" className="flex max-w-sm gap-2">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
            <input
              type="search"
              name="q"
              defaultValue={search.value}
              placeholder={search.placeholder}
              className="focus-visible:ring-ring/50 h-9 w-full rounded-md border bg-white pr-3 pl-8 text-sm outline-none focus-visible:ring-3"
            />
          </div>
          <button
            type="submit"
            className="bg-brand h-9 rounded-md px-3 text-sm font-medium text-white"
          >
            検索
          </button>
        </form>
      )}

      <div className="overflow-x-auto rounded-xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((c) => (
                <TableHead key={c.key} className={c.className}>
                  {c.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-muted-foreground py-10 text-center"
                >
                  {empty}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((c) => (
                    <TableCell key={c.key} className={c.className}>
                      {c.cell(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && pagination.total > pagination.pageSize && <Pager {...pagination} />}
    </div>
  );
}

function Pager({
  page,
  pageSize,
  total,
  basePath,
  q,
}: {
  page: number;
  pageSize: number;
  total: number;
  basePath: string;
  q?: string;
}) {
  const pages = Math.ceil(total / pageSize);
  const href = (p: number) => `${basePath}?page=${p}${q ? `&q=${encodeURIComponent(q)}` : ""}`;
  const link = (p: number, label: string, disabled: boolean) => (
    <Link
      href={href(p)}
      aria-disabled={disabled}
      className={cn(
        "rounded-md border px-3 py-1.5 text-sm",
        disabled ? "pointer-events-none opacity-40" : "hover:bg-muted",
      )}
    >
      {label}
    </Link>
  );
  return (
    <div className="text-muted-foreground flex items-center justify-between text-sm">
      <span>
        {total}件中 {(page - 1) * pageSize + 1}〜{Math.min(page * pageSize, total)}件
      </span>
      <div className="flex gap-2">
        {link(page - 1, "前へ", page <= 1)}
        {link(page + 1, "次へ", page >= pages)}
      </div>
    </div>
  );
}
