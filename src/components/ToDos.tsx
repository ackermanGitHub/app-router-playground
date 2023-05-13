import { sql, QueryResult } from "@vercel/postgres";
import z from 'zod';

const todoSchema = {
    todo_id: z.number().int().positive(),
    date_created: z.date(),
    title: z.string().optional().nullable(),
    text: z.string().optional().nullable(),
    category: z.string().optional().nullable(),
    priority: z.number().int().optional().nullable(),
    completed: z.boolean().optional().nullable(),
    due_date: z.date().optional().nullable(),
    assigned_to: z.string().optional().nullable(),
    notes: z.object({}).optional().nullable(),
    attachments: z.object({}).optional().nullable(),
    tags: z.array(z.string()).optional().nullable(),
};

const getToDos = async () => {
    const res: QueryResult<typeof todoSchema> = await sql`
        SELECT * FROM todos
    `
    const todos = res.rows;
    return todos;
}

const ToDos = async () => {
    const todos = await getToDos();

    return (
        <div className="w-full h-full">
            {
                todos.map((todo, index) => {
                    return (
                        <div key={index}>
                            {JSON.stringify(todo.title)}
                        </div>
                    )
                })
            }
        </div>
    );
}

export default ToDos
