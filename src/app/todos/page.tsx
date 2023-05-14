import { columns } from "./columns"
import { DataTable } from "./data-table"
import { todosArraySchema } from "@/server/common"
import { QueryResult, sql } from "@vercel/postgres"

const getToDos = async () => {
    const res: QueryResult = await sql`
        SELECT * FROM todos
    `
    const todos = todosArraySchema.parseAsync(res.rows);
    return todos;
}

export default async function DemoPage() {
    const todos = await getToDos()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={todos} />
        </div>
    )
}
