import { sql, QueryResult } from "@vercel/postgres";
import * as z from 'zod';

const todoSchema = {
    todo_id: z.number().int().positive(),
    date_created: z.date().optional().default(new Date()),
    title: z.string().optional(),
    text: z.string().optional(),
    category: z.string().optional(),
    priority: z.number().int().optional(),
    completed: z.boolean().optional().default(false),
    due_date: z.date().optional(),
    assigned_to: z.string().optional(),
    notes: z.object({}).optional(),
    attachments: z.object({}).optional(),
    tags: z.array(z.string()).optional(),
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
