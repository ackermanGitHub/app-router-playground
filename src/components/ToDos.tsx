"use client"
import { InputContext } from "@/hooks/useInput";
import { useContext, useTransition } from "react";
import z from 'zod';
import { updateTodo } from "@/server/actions";
import { todosArraySchema } from "@/server/common";

const ToDos = ({ todos }: { todos: z.infer<typeof todosArraySchema> }) => {
    const { editInput } = useContext(InputContext)
    let [isPending, startTransition] = useTransition();

    return (
        <div className="w-full h-full">
            {
                todos.map((todo, index) => {
                    return (
                        <div
                            key={index}>
                            <h1 onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                const target =
                                    event.currentTarget;
                                if (!target) {
                                    throw new Error('target not found at ProductsTable');
                                }
                                const position = {
                                    x: target.offsetLeft,
                                    y: target.offsetTop,
                                };
                                const size = {
                                    width: target.offsetWidth,
                                    height: target.offsetHeight,
                                };
                                editInput.setLeft(position.x);
                                editInput.setTop(position.y);
                                editInput.setHeight(size.height);
                                editInput.setWidth(size.width);
                                editInput.setValue(todo.title || "");
                                editInput.setActive(true);
                                editInput.setCallback(() => {
                                    return (value: string) => {
                                        if (value !== todo.title) {
                                            console.log("updateTodo")
                                            startTransition(() => updateTodo({ title: value, todo_id: todo.todo_id }))
                                        }
                                    }
                                })

                            }}>{todo.title}</h1>
                            <p>{todo.text}</p>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default ToDos
