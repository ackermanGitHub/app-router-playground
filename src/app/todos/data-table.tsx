"use client"
import { InputContext } from "@/hooks/useInput";
import { useContext, useTransition } from "react";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { logDev } from "@/utils/functions";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    const { editInput } = useContext(InputContext)
    let [isPending, startTransition] = useTransition();

    return (
        <div className="rounded-md border">
            <Table>
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
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        onClick={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            const target =
                                                event.currentTarget;
                                            if (!target) {
                                                throw new Error('target not found at ProductsTable');
                                            }
                                            const position = {
                                                x: target.offsetLeft,
                                                y: target.offsetTop,
                                            };
                                            const size = {
                                                width: target.offsetWidth,
                                                height: target.offsetHeight,
                                            };
                                            editInput.setLeft(position.x);
                                            editInput.setTop(position.y);
                                            editInput.setHeight(size.height);
                                            editInput.setWidth(size.width);
                                            editInput.setValue("");
                                            editInput.setActive(true);
                                            editInput.setCallback(() => {
                                                return (value: string) => {
                                                    // startTransition(() => updateTodo({ title: value, todo_id: todo.todo_id }))
                                                    logDev("data-table callback", value)
                                                }
                                            })

                                        }}
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
            </Table>
        </div>
    )
}
