"use client"

import { ColumnDef } from "@tanstack/react-table"
import { todoSchema } from "@/server/common"
import { z } from "zod"

export const columns: ColumnDef<z.infer<typeof todoSchema>>[] = [
    {
        accessorKey: "tags",
        header: "Tags",
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "date_created",
        header: "Date Created",
        accessorFn({ date_created }) {
            return date_created.toISOString()
        }
    },
]
