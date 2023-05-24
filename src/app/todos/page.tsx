import { columns } from "./columns"
import { DataTable } from "./data-table"
import { todosArraySchema } from "@/server/common"
import { QueryResult, sql } from "@vercel/postgres"
import { auth } from "@clerk/nextjs/server"

export const revalidate = 3600; // revalidate every hour

const getToDos = async (userId: string) => {
    const res: QueryResult = await sql`
        SELECT * FROM todos
        WHERE user_id = ${userId}
        ORDER BY todo_id DESC
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

    return <DataTable columns={columns} data={todos} />

}
