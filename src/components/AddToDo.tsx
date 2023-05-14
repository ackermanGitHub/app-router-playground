"use client"
import { useTransition } from 'react';
import { insertToDo } from "@/server/actions";
import { useAuth } from "@clerk/nextjs";

export default function AddToDo() {
    const { isSignedIn, userId } = useAuth();
    let [isPending, startTransition] = useTransition();

    return (
        <div className="m-4 border-orange-600 border-solid border-2 h-full">
            <form className="flex flex-col my-5 gap-2 w-full h-full" action={(data) => {
                const title = data.get("title") as string;
                const text = data.get("text") as string;
                const category = data.get("category") as string;
                const due_date = data.get("due_date") as string;
                const assigned_to = data.get("assigned_to") as string;
                const tags = data.get("tags") as string;

                if (!isSignedIn) {
                    throw new Error("User not logged in");
                }

                console.log({ title, text, category, due_date, assigned_to, tags: [tags] });
                startTransition(() => insertToDo({ title, text, category, due_date: new Date(due_date), assigned_to, tags: [tags], priority: null, user_id: userId }))
            }}>
                {isPending && <div>Loading..</div>}
                <input className="w-36 border-stone-600 border-solid border mx-auto" type="text" placeholder="title" id="title" name="title" />
                <input className="w-36 border-stone-600 border-solid border mx-auto" type="text" placeholder="text" id="text" name="text" />
                <input className="w-36 border-stone-600 border-solid border mx-auto" type="text" placeholder="category" id="category" name="category" />
                <input className="w-36 border-stone-600 border-solid border mx-auto" type="date" placeholder="due_date" id="due_date" name="due_date" />
                <textarea className="w-36 border-stone-600 border-solid border mx-auto" placeholder="assigned_to" id="assigned_to" name="assigned_to"></textarea>
                <select className="w-36 border-stone-600 border-solid border mx-auto" name="tags" id="tags">
                    <option value="To Do">To Do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>
                <button className="bg-slate-900 mx-auto 🅱️ text-white rounded-lg px-4 py-2" >
                    Create Note
                </button>
            </form>
        </div>
    );
}
