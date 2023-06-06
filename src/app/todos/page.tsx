import { columns } from "./columns"
import { DataTable } from "./data-table"
import { todosArraySchema } from "@/server/common"
import { QueryResult, sql } from "@vercel/postgres"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Divider from "@/components/Divider"

const getToDos = async (userId: string) => {
    console.log(`
        SELECT * FROM todos
        WHERE user_id = ${userId}
        ORDER BY todo_id DESC
    `)
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
        <div className="text-center mx-auto p-4 max-[600px]:h-[calc(100vh-80px)] min-[600px]:h-screen max-w-5xl w-full flex flex-col justify-center items-center">
            <h2 className="text-2xl text-gray-700 dark:text-slate-400">
                <span className="font-bold">You are not logged in.</span>
                <br />
                <span className="text-xl">Please log in to view this page.</span>
            </h2>
            <Divider />
            <Link href={'/sign-in'}>
                <Button>
                    Sign In
                </Button>
            </Link>
        </div>
    )
    const todos = await getToDos(userId)

    return <DataTable columns={columns} data={todos} />

}
