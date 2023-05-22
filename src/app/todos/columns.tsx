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
            <SheetTrigger ref={sheetTriggerRef}>{todo.title || "No tittle"}</SheetTrigger>
            <SheetContent forceMount size={"lg"} >
                <SheetHeader>
                    <SheetTitle
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) => {
                            if (!sheetTriggerRef.current) {
                                throw new Error("sheetTriggerRef is not defined");
                            }
                            sheetTriggerRef.current.innerText = e.currentTarget.innerText;

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

