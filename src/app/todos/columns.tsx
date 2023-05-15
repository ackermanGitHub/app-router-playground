"use client"
import { ColumnDef } from "@tanstack/react-table"
import { todoSchema } from "@/server/common"
import { z } from "zod"
import { useInput } from "@/hooks/useInput";
import { logDev } from "@/utils/functions";
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
        cell({ getValue, row }) {
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
    return (
        <Select>
            <SelectTrigger className="w-[80px]">
                <SelectValue placeholder={todo.tags ? todo.tags[0] : "Select"} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Tags</SelectLabel>
                    {
                        tagsList.filter(tag => todo.tags && tag !== todo.tags[0]).map(tag => (
                            <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

function TitleCell({ todo }: { todo: z.infer<typeof todoSchema> }) {
    const { editInput } = useInput()
    const [, startTransition] = useTransition()
    return (
        <div className="flex items-center justify-between gap-2 text-primary w-full h-full min-w-[80px] min-h-[20px]">
            <Sheet >
                <SheetTrigger>{todo.title ? todo.title : "Select"}</SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>{ }</SheetTitle>
                        <SheetDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
            <svg onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                const target =
                    event.currentTarget.parentElement?.parentElement;
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
                editInput.setValue(todo.title || "");
                editInput.setActive(true);
                editInput.setCallback(() => {
                    return (title: string) => {
                        if (title !== todo.title) {
                            startTransition(() => updateTodo({ title, todo_id: todo.todo_id }))
                            logDev("✅✅✅ title update done", title)
                        } else {
                            logDev("❌❌❌ title update not done")
                        }
                    }
                })

            }} viewBox="0 0 16 16" className="min-h-[16px] min-w-[16px]" width={16} height={16} display="block" fill="currentColor" ><path d="M3.926 13.307H14.11c.183 0 .34-.066.472-.199a.644.644 0 00.198-.471.652.652 0 00-.198-.479.644.644 0 00-.472-.198H5.272l-1.346 1.347zm-.704-.636l7.683-7.684-1.312-1.319-7.69 7.684-.67 1.606c-.037.1-.017.191.06.273.083.082.174.105.274.069l1.655-.63zm8.34-8.326l.738-.732c.182-.187.278-.376.287-.567.009-.192-.068-.374-.232-.547l-.267-.267c-.169-.168-.351-.246-.547-.232-.196.014-.385.11-.567.287l-.739.732 1.327 1.326z"></path></svg>
        </div>
    )
}

