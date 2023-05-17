import { columns } from "./columns"
import { DataTable } from "./data-table"
import { todosArraySchema } from "@/server/common"
import { QueryResult, sql } from "@vercel/postgres"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export const revalidate = 3600; // revalidate every hour

const getToDos = async () => {
    const res: QueryResult = await sql`
        SELECT * FROM todos
        ORDER BY todo_id ASC
    `
    const todos = todosArraySchema.parseAsync(res.rows);
    return todos;
}

export default async function DemoPage() {
    const todos = await getToDos()

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
