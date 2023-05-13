"use client"
import { useZact } from "zact/client";
import { insertToDoWithClientQuery } from "@/server/actions";

export default function AddToDo() {
    const { mutate, data, isLoading } = useZact(insertToDoWithClientQuery);

    return (
        <div className="w-full h-full">
            {isLoading && <div>Loading...</div>}
            {data}
            <h1 className="text-3xl font-bold underline">ToDoForm</h1>
            <form action={(data) => {
                const title = data.get("title") as string;
                const text = data.get("text") as string;
                const category = data.get("category") as string;
                const due_date = data.get("due_date") as string;
                const assigned_to = data.get("assigned_to") as string;
                console.log({ data, title, text, category, due_date, assigned_to });
                mutate({ title, text, category, due_date: new Date(due_date), assigned_to, tags: ["fisrt", "second"], notes: "anoteeeeeeeeeeeeeeeeee" })
            }}>
                <input type="text" placeholder="title" id="title" name="title" />
                <input type="text" placeholder="text" id="text" name="text" />
                <input type="text" placeholder="category" id="category" name="category" />
                <input type="date" placeholder="due_date" id="due_date" name="due_date" />
                <input type="text" placeholder="assigned_to" id="assigned_to" name="assigned_to" />
                <textarea placeholder="notes" id="notes" name="notes"></textarea>
                <textarea placeholder="attachments" id="attachments" name="attachments"></textarea>
                <select name="tags" id="tags"></select>
                <button>
                    Create Note
                </button>
            </form>
        </div>
    );
}
