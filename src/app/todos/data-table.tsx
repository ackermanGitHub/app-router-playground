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
import { useState, useTransition } from "react";
import { deleteTodos, insertToDo } from "@/server/actions";
import { Button } from "@/components/ui/button";
import NotDoneYet from "@/components/NotDoneYet";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<z.infer<typeof todoSchema>, TValue>) {
    const [isPending, startTransition] = useTransition()
    const [todos, setTodos] = useState<z.infer<typeof todoSchema>[]>(data)

    const table = useReactTable({
        data: todos,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    const { user, isSignedIn, isLoaded } = useUser()

    if (!isLoaded) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] text-gray-700 dark:text-slate-400">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-zinc-700 dark:border-zinc-400" />
                <h2 className="text-2xl mt-3">
                    <span className="font-bold">Loading User</span>
                    <span className="text-5xl animate-pulse delay-300">.</span>
                    <span className="text-5xl animate-pulse delay-700">.</span>
                    <span className="text-5xl animate-pulse delay-1000">.</span>
                </h2>
            </div>
        )
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
        const getSelectedToDoIds = () => table.getSelectedRowModel().rows.map(row => row.original.todo_id)
        function checkIdsAndMakeMutation(ids: number[], count = 3, delay = 2000) {
            if (!getSelectedToDoIds().length) {
                throw new Error("No ToDos selected");
            }
            if (ids.find(id => id < 0)) {
                if (count > 0) {
                    table.options.enableRowSelection = false
                    setTimeout(() => {
                        console.log('Retrying deletion', getSelectedToDoIds(), count)
                        checkIdsAndMakeMutation(getSelectedToDoIds(), count - 1, delay)
                    }, delay)
                } else {
                    console.log('Maximum retries reached, mutation aborted')
                }
            } else {
                startTransition(() => deleteTodos({ todo_ids: ids }))
                setTodos((prev) => {
                    return prev.filter(todo => !getSelectedToDoIds().includes(todo.todo_id))
                })
                table.options.enableRowSelection = true
                table.resetRowSelection()
            }
        }
        checkIdsAndMakeMutation(getSelectedToDoIds(), 3, 2000)
    }


    return (
        <Tabs defaultValue="table" className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4 p-4">
                <TabsList>
                    <TabsTrigger value="table">Table</TabsTrigger>
                    <TabsTrigger value="board">Board</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                    {
                        isPending &&
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500 ml-4" />
                    }
                    <Button onClick={() => {

                        console.log("toDos", {
                            todos, tableToDos:
                                table.getRowModel(),
                            selected: table.getSelectedRowModel()
                        })
                        table.options.enableRowSelection = !table.options.enableRowSelection

                    }}>Print Todos</Button>
                    <svg onClick={handleAddToDo} className="🅱️" aria-label="New post" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                        <path className="dark:text-[#b3b3b3]" d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                        <line className="dark:text-[#b3b3b3]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line>
                        <line className="dark:text-[#b3b3b3]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line>
                    </svg>
                    <svg onClick={handleDelete} className="🅱️"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            className="dark:text-[#b3b3b3]"
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
                    // Atention: the data={todos} param forces a re-render when the data changes.
                    // That avoid outdated table contents
                    data.length
                        ? <TableView columns={columns} data={todos} table={table} />
                        : <>You don&apos;t have any todos yet. Add one below</>
                }
            </TabsContent>
            <TabsContent value="board">
                {
                    data.length
                        ? <NotDoneYet />
                        : <>You don&apos;t have any todos yet. Add one below</>
                }
            </TabsContent>
        </Tabs>
    )
}
