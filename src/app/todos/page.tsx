import { columns } from "./columns"
import { DataTable } from "./data-table"
import { todosArraySchema } from "@/server/common"
import { QueryResult, sql } from "@vercel/postgres"

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
        <div className="container mx-auto p-4">
            <DataTable columns={columns} data={todos} />
        </div>
    )
}
