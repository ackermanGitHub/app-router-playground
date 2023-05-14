import AddToDo from "@/components/AddToDo";
import ToDos from "@/components/ToDos";
import { sql, QueryResult } from "@vercel/postgres";
import { todosArraySchema } from "@/server/common";

const getToDos = async () => {
    const res: QueryResult = await sql`
        SELECT * FROM todos
    `
    const todos = todosArraySchema.parseAsync(res.rows);
    return todos;
}

export default async function Dashboard() {
    const todos = await getToDos();
    return (
        <div className="container mx-auto">
            <AddToDo />
            {/* @ts-ignore */}
            <ToDos todos={todos} />
        </div>
    )
}

