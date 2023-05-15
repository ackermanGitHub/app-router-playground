"use client"

import { ColumnDef } from "@tanstack/react-table"
import { todoSchema } from "@/server/common"
import { z } from "zod"
import { useInput } from "@/hooks/useInput";
import { logDev } from "@/utils/functions";
import { updateTodo } from "@/server/actions";
import { useTransition } from "react";

export const columns: ColumnDef<z.infer<typeof todoSchema>>[] = [
    {
        accessorKey: "tags",
        header: "Tags",
        cell({ getValue, row }) {
            return (
                <TagCell todo_id={row.original.todo_id} value={getValue<string>()} />
            )
        },
    },
    {
        accessorKey: "title",
        header: "Title",
        cell({ getValue, row }) {
            return (
                <TitleCell todo_id={row.original.todo_id} value={getValue<string>()} />
            )
        },
    },
    {
        accessorKey: "date_created",
        header: "Date Created",
        cell({ getValue }) {
            return (
                <div className="text-sm text-gray-500">
                    {getValue<Date>().toLocaleString("en-US")}
                </div>
            )
        },
    },
]

function TagCell({ value, todo_id }: { value: string, todo_id: number }) {
    const [, startTransition] = useTransition()
    return (
        <select
            onChange={(event) => {
                event.preventDefault();
                event.stopPropagation();
                logDev("data-table callback", event.target.value)
            }}
            defaultValue="To Do" className="bg-transparent"
        >
            <option value="To Do">To Do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
        </select>
    )
}

function TitleCell({ value, todo_id }: { value: string, todo_id: number }) {
    const { editInput } = useInput()
    const [, startTransition] = useTransition()
    return (
        <div onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            const target =
                event.currentTarget.parentElement;
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
            editInput.setValue(value);
            editInput.setActive(true);
            editInput.setCallback(() => {
                return (title: string) => {
                    if (title !== value) {
                        startTransition(() => updateTodo({ title, todo_id: todo_id }))
                        logDev("✅✅✅ title update done", title)
                    } else {
                        logDev("❌❌❌ title update not done")
                    }
                }
            })

        }} className="text-sm w-fit min-w-[80px] min-h-[20px] text-gray-500">
            {value}
        </div>
    )
}