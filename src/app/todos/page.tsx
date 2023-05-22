import { columns } from "./columns"
import { DataTable } from "./data-table"
import { todosArraySchema } from "@/server/common"
import { QueryResult, sql } from "@vercel/postgres"
import { auth } from "@clerk/nextjs/server"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export const revalidate = 3600; // revalidate every hour

const getToDos = async (userId: string) => {
    const res: QueryResult = await sql`
        SELECT * FROM todos
        WHERE user_id = ${userId}
        ORDER BY todo_id ASC
    `
    const todos = todosArraySchema.parseAsync(res.rows);
    return todos;
}

export default async function ToDosPage() {
    const { userId } = auth();

    if (!userId) return (
        <div className="container mx-auto p-4">
            <p>You need to be logged in to view this page.</p>
        </div>
    )

    const todos = await getToDos(userId)

    if (todos.length === 0) return (
        <div className="container mx-auto p-4">
            <p>You don&apos;t have any todos yet. Add one below.</p>
        </div>
    )

    return (
        <Tabs defaultValue="table" className="container mx-auto p-4">
            <TabsList>
                <TabsTrigger value="table">Table</TabsTrigger>
                <TabsTrigger value="board">Board</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
                <DataTable columns={columns} data={todos} />
            </TabsContent>
            <TabsContent value="board">Put your board here.</TabsContent>
        </Tabs>
    )
}
