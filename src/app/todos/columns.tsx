"use client"
import { ColumnDef } from "@tanstack/react-table"
import { todoSchema } from "@/server/common"
import { z } from "zod"
import { updateTodo } from "@/server/actions";
import { useRef, useState, useTransition } from "react";
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
import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<z.infer<typeof todoSchema>>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,

    },

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
    const [isPending, startTransition] = useTransition()

    const sheetTriggerRef = useRef<HTMLButtonElement>(null);
    const [title, setTitle] = useState(todo.title)

    const textRef = useRef(todo.text);
    const [text, setText] = useState(todo.text)

    return (
        <Sheet onOpenChange={() => {
            if (!sheetTriggerRef.current) {
                throw new Error("sheetTriggerRef is not defined");
            }
            setTitle(sheetTriggerRef.current.innerText)
            setText(textRef.current)
        }} >
            <SheetTrigger className="text-left" ref={sheetTriggerRef}>{todo.title || "No tittle"}</SheetTrigger>
            <SheetContent className="text-left" forceMount size={"lg"} >
                {
                    isPending &&
                    <div className="absolute top-4 left-4 animate-spin rounded-full h-4 w-4 border-b-2 border-red-500 ml-4" />
                }
                <SheetHeader>
                    <SheetTitle
                        className="flex items-center mt-10"
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) => {
                            if (!sheetTriggerRef.current) {
                                throw new Error("sheetTriggerRef is not defined");
                            }
                            sheetTriggerRef.current.innerText = e.currentTarget.innerText;
                            todo.title = e.currentTarget.innerText;
                            startTransition(() => updateTodo({ title: e.currentTarget.innerText, todo_id: todo.todo_id }))
                        }}
                    >
                        {title}
                    </SheetTitle>
                    <SheetDescription
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) => {
                            textRef.current = e.currentTarget.innerText;
                            todo.text = e.currentTarget.innerText;
                            startTransition(() => updateTodo({ text: e.currentTarget.innerText, todo_id: todo.todo_id }))
                        }}
                    >
                        {text}
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

