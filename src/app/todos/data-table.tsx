"use client"
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { todoSchema } from "@/server/common"
import { z } from "zod"
import { useUser } from "@clerk/nextjs";
import { TableView } from "@/components/TableView"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRef, useState, useTransition } from "react";
import { deleteTodos, insertToDo } from "@/server/actions";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<z.infer<typeof todoSchema>, TValue>) {
    const [, startTransition] = useTransition()
    const [todos, setTodos] = useState<z.infer<typeof todoSchema>[]>(data)
    const toDeleteToDos = useRef<number[]>([])

    const table = useReactTable({
        data: todos,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    const { user, isSignedIn, isLoaded } = useUser()

    if (!isLoaded) {
        return <p>Loading...</p>
    }

    if (!isSignedIn) {
        throw new Error("User is not signed in");
    }

    const handleAddToDo = () => {
        const newId = -Math.floor(Math.random() * 1000000)
        setTodos((prev) => {
            return [
                {
                    todo_id: newId,
                    user_id: user.id,
                    date_created: new Date(),
                    title: null,
                    text: null,
                    category: null,
                    priority: null,
                    completed: false,
                    due_date: null,
                    assigned_to: null,
                    notes: null,
                    attachments: null,
                    tags: ['To Do'],
                    last_modified: null
                },
                ...prev,
            ]
        })
        startTransition(async () => {
            const resId = await insertToDo({ user_id: user.id, tags: ["To Do"] })

            setTodos((prev) => {
                // update the inserted todo with the response id:

                return prev.map((todo) => {
                    if (todo.todo_id === newId) {
                        return {
                            ...todo,
                            todo_id: resId
                        }
                    }
                    return todo
                })

            })
        })
        table.setRowSelection((prevSelection) => {
            console.log("prevSelection", prevSelection)
            const newSelection: {
                [key: number]: boolean
            } = {};

            for (const [key, value] of Object.entries(prevSelection)) {
                const newKey = parseInt(key) + 1;
                newSelection[newKey] = value;
            }

            console.log("newSelection", newSelection)
            return newSelection
        })

    }

    const handleDelete = () => {
        const getToDosIds = () => table.getSelectedRowModel().rows.map(row => row.original.todo_id)
        startTransition(() => deleteTodos({ todo_ids: getToDosIds() }))
        if (getToDosIds().find(id => id < 0)) {
            return setTimeout(() => {
                console.log(getToDosIds())
            }, 8000)
        }
        setTodos((prev) => {
            // update the inserted todo with the response id:

            return prev.filter(todo => !getToDosIds().includes(todo.todo_id))

        })
        table.resetRowSelection()
    }


    return (
        <Tabs defaultValue="table" className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <TabsList>
                    <TabsTrigger value="table">Table</TabsTrigger>
                    <TabsTrigger value="board">Board</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                    <Button onClick={() => {
                        console.log(todos)
                    }}>Print Todos</Button>
                    <svg onClick={handleAddToDo} className="🅱️" aria-label="New post" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                        <path className="text-[#b3b3b3]" d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                        <line className="text-[#b3b3b3]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line>
                        <line className="text-[#b3b3b3]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line>
                    </svg>
                    <svg onClick={handleDelete} className="🅱️"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            className="text-[#b3b3b3]"
                            d="M5 6.77273H9.2M19 6.77273H14.8M9.2 6.77273V5.5C9.2 4.94772 9.64772 4.5 10.2 4.5H13.8C14.3523 4.5 14.8 4.94772 14.8 5.5V6.77273M9.2 6.77273H14.8M6.4 8.59091V15.8636C6.4 17.5778 6.4 18.4349 6.94673 18.9675C7.49347 19.5 8.37342 19.5 10.1333 19.5H13.8667C15.6266 19.5 16.5065 19.5 17.0533 18.9675C17.6 18.4349 17.6 17.5778 17.6 15.8636V8.59091M9.2 10.4091V15.8636M12 10.4091V15.8636M14.8 10.4091V15.8636"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
            <TabsContent value="table">
                {
                    data.length
                        ? <TableView columns={columns} data={data} table={table} />
                        : <>You don&apos;t have any todos yet. Add one below</>
                }
            </TabsContent>
            <TabsContent value="board">
                {
                    data.length
                        ? <>Put your board here.</>
                        : <>You don&apos;t have any todos yet. Add one below</>
                }
            </TabsContent>
        </Tabs>
    )
}
