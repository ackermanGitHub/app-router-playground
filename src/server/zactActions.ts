'use server';
import { createClient } from '@vercel/postgres';
import { zact } from 'zact/server';
import { todoInputSchema, absValue } from './common';

export const insertToDo = zact(todoInputSchema)(async (input) => {
  const client = createClient();
  await client.connect();

  const noNulls = Object.entries(input).filter(([_key, value]) => {
    if (value !== null) {
      return true;
    }
    return false;
  });

  const noEmptyStrings = noNulls.filter(([_key, value]) => {
    if (value !== '') {
      return true;
    }
    return false;
  });

  const keys = noEmptyStrings.map((entry) => entry[0]);
  const values = noEmptyStrings.map((entry) => entry[1]);

  try {
    console.log(`
        INSERT INTO todos (${keys})
        VALUES (${values.map((value) => absValue(value))});
      `);
    await client.query(`
        INSERT INTO todos (${keys})
        VALUES (${values.map((value) => absValue(value))});
       `);
  } catch (e) {
    throw e;
  }

  console.log('success');
  return 'success';
});

/* 
CREATE TABLE todos (
    todo_id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT NOW(),
    title TEXT,
    text TEXT,
    category TEXT,
    priority INTEGER,
    completed BOOLEAN DEFAULT FALSE,
    due_date DATE,
    assigned_to TEXT,
    notes JSONB,
    attachments JSONB,
    tags TEXT[]
);
*/

/* 
Zact - Zod Server ACTions
We like NextJS Server Actions. We wanted to love them. This package makes them validated and typesafe, so you can use them in things that aren't forms.

npm install zact

Backend
// action.ts
"use server";

import { z } from "zod";
import { zact } from "zact/server";
export const validatedAction = zact(z.object({ stuff: z.string().min(6) }))(
  async (input) => {
    return { message: `hello ${input.stuff}` };
  }
);
Client WITH custom hook
// component.tsx
"use client";

import { validatedAction } from "./action";
import { useZact } from "zact/client";

export const zactTestComponent = () => {
  const { mutate, data, isRunning } = useZact(validatedAction);

  return (
    <div>
      <button onClick={() => mutate({ stuff: "testtestaet" })}>
        Run server action
      </button>
      {isRunning && <div>Loading...</div>}
      {data?.message}
    </div>
  );
};
Client WITHOUT custom hook
Yes you can just import them and call them like promises too

// component.tsx
"use client";

import { validatedAction } from "./action";

export const zactTestComponent = () => {
  return (
    <div>
      <button onClick={() => {
        validatedAction({ stuff: "test" }).then((response) => console.log("response!", response));
      }>
        Run server action
      </button>
    </div>
  );
};
*/
