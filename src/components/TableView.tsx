"use client"
import {
    ColumnDef,
    flexRender,
    Table
} from "@tanstack/react-table"
import {
    Table as TableUI,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { todoSchema } from "@/server/common"
import { z } from "zod"

interface TableViewProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    table: Table<TData>
}

export function TableView<TData, TValue>({
    columns,
    data,
    table
}: TableViewProps<z.infer<typeof todoSchema>, TValue>) {

    return (
        <TableUI>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            )
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row, index) => (
                        <TableRow
                            /* This comment is in the memory of the many, and i mean, maaany hours wasted triying to fing a bug related to the id setted here */
                            key={row.original.date_created.getMilliseconds()}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell
                                    key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </TableUI>
    )
}
