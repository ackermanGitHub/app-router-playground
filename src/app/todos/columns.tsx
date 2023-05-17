"use client"
import { ColumnDef } from "@tanstack/react-table"
import { todoSchema } from "@/server/common"
import { z } from "zod"
import { updateTodo } from "@/server/actions";
import { useTransition } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export const columns: ColumnDef<z.infer<typeof todoSchema>>[] = [
    {
        accessorKey: "tags",
        header: "Tags",
        cell({ row }) {
            return (
                <TagCell todo={row.original} />
            )
        },
    },
    {
        accessorKey: "title",
        header: "Title",
        cell({ row }) {
            return (
                <TitleCell todo={row.original} />
            )
        },
    },
    {
        accessorKey: "date_created",
        header: "Date Created",
        cell({ getValue }) {
            return (
                <div className="text-primary">
                    {getValue<Date>().toLocaleString("en-US")}
                </div>
            )
        },
    },
]

const tagsList = [
    "To Do",
    "Doing",
    "Done"
]

function TagCell({ todo }: { todo: z.infer<typeof todoSchema> }) {
    const [, startTransition] = useTransition()
    const tag = todo.tags ? todo.tags[0] : "Select"
    return (
        <Select
            onValueChange={(value) => {
                startTransition(() => updateTodo({ tags: [value], todo_id: todo.todo_id }))
            }}
            defaultValue={tag}
        >
            <SelectTrigger className="w-[90px]">
                <SelectValue placeholder={tag} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Tags:</SelectLabel>
                    {
                        tagsList.map(tag => (
                            <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

function TitleCell({ todo }: { todo: z.infer<typeof todoSchema> }) {
    const [, startTransition] = useTransition()
    return (
        <Sheet >
            <SheetTrigger>{todo.title ? todo.title : "No tittle"}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle
                        contentEditable
                        onInput={(e) => {
                            startTransition(() => updateTodo({ title: e.currentTarget.innerText, todo_id: todo.todo_id }))
                        }}
                    >
                        {todo.title}
                    </SheetTitle>
                    <SheetDescription
                        contentEditable
                        onInput={(e) => {
                            startTransition(() => updateTodo({ text: e.currentTarget.innerText, todo_id: todo.todo_id }))
                        }}
                    >
                        {todo.text}
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

