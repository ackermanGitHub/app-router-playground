'use server';
import { createClient } from '@vercel/postgres';
import { z } from 'zod';
import { todoInputSchema, absValue } from './common';
import { revalidatePath } from 'next/cache';

export const insertToDo = async (input: z.TypeOf<typeof todoInputSchema>) => {
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

  revalidatePath(`/dashboard`);
};

export const updateTodo = async (
  input: z.TypeOf<typeof todoInputSchema> & { todo_id: number }
) => {
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

  const noTodoId = noEmptyStrings.filter(([key, _value]) => {
    if (key !== 'todo_id') {
      return true;
    }
    return false;
  });

  const key_value_pairs = noTodoId.map((entry) => {
    return `${entry[0]} = ${absValue(entry[1])}`;
  });

  try {
    console.log(`
        UPDATE todos
        SET ${key_value_pairs}
        WHERE todo_id = ${input.todo_id};
      `);
    await client.query(`
        UPDATE todos
        SET ${key_value_pairs}
        WHERE todo_id = ${input.todo_id};
      `);
  } catch (e) {
    throw e;
  }

  revalidatePath(`/dashboard`);
};

/* 
Bito: Sure, here are some example SQL queries to help you create the tables and populate them with data: 
 
AUTO_INCREMENT integer

1. Create the "users" table:
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  avatar_url VARCHAR(255)
);
2. Insert a user into "users" table:
INSERT INTO users (username, email, password, avatar_url) 
VALUES ('johndoe', 'johndoe@example.com', 'abc123', 'https://example.com/avatar.jpg');
3. Create the "posts" table:
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  caption VARCHAR(300),
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
4. Insert a post into "posts" table:
INSERT INTO posts (user_id, image_url, caption, likes) 
VALUES (1, 'https://example.com/image.jpg', 'This is a caption for the post', 10);
5. Create the "comments" table:
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  post_id INTEGER NOT NULL,
  content VARCHAR(300) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);
6. Insert a comment into "comments" table:
INSERT INTO comments (user_id, post_id, content) 
VALUES (1, 1, 'This is a comment on the post');
These are just some example SQL queries to help you get started. You can customize them based on your specific needs and requirements. Make sure to test each query to ensure that it works as expected before moving on to the next one.
*/

/* 
Question :

Generate code in SQL (with postgres) for creating a table of todos list, with a date of creation, a tittle, the text, and other columns you may come ou with
Answer :

Share icon
Sure, here's an example SQL code for creating a table of todos list with Postgres:
CREATE TABLE todos (
    todo_id SERIAL PRIMARY KEY,
    date_created TIMESTAMP DEFAULT NOW(),
    title TEXT,
    text TEXT,
    category TEXT,
    priority INTEGER
);
This code creates a table called  todos  with columns for  todo_id ,  date_created ,  title ,  text ,  category , and  priority . The  todo_id  column is set to auto-increment using the  SERIAL  data type, and is set as the primary key of the table. The  date_created  column is set to the current date and time by default whenever a new row is inserted into the table using the  TIMESTAMP  data type. The  title ,  text ,  category , and  priority  columns are all set to the  TEXT  and  INTEGER  data types respectively. 
 
You can customize this code to add or remove columns and change the data types as per your requirements.
Question :

What other column could i add to make my page more interactive?
Answer :

Share icon
You could consider adding the following columns to your  todos  table to make your page more interactive: 
 
1.  completed  - a boolean column (TRUE or FALSE) to indicate whether the todo has been completed or not. 
2.  due_date  - a date column to indicate the deadline for the todo. 
3.  assigned_to  - a text column to indicate who the todo is assigned to. 
4.  notes  - a text column to allow users to add any additional notes regarding the todo. 
5.  attachments  - a text column to allow users to upload or attach files related to the todo. 
6.  tags  - a text column to add searchable tags related to the todo. 
 
These columns can help users keep track of their todos and add additional context and information to each entry. You can modify the data types and column names as per your requirements.
Question :

now add them to the original query for create the table
Answer :

Share icon
Certainly! Here is an updated SQL code for creating a table of todos list with the additional columns you requested:
CREATE TABLE todos (
    todo_id SERIAL PRIMARY KEY,
    date_created TIMESTAMP DEFAULT NOW(),
    title TEXT,
    text TEXT,
    category TEXT,
    priority INTEGER,
    completed BOOLEAN DEFAULT FALSE,
    due_date DATE,
    assigned_to TEXT,
    notes TEXT,
    attachments TEXT,
    tags TEXT
);
This code adds the  completed ,  due_date ,  assigned_to ,  notes ,  attachments , and  tags  columns to the  todos  table with their respective data types. The  completed  column is set to default to  FALSE  to indicate that a new todo is not yet completed by default. 
 
Please keep in mind that this is just an example and you can modify the data types, column names and default values as per your specific requirements.
Question :

Dont you think that the tags column shoud be an array of strings for containing several tags?
Answer :

Share icon
Yes, definitely! Using an array of strings for the  tags  column would be a better approach as it would allow users to add multiple tags to each todo. Here's an updated SQL code for creating the  todos  table with an array of strings for the  tags  column:
CREATE TABLE todos (
    todo_id SERIAL PRIMARY KEY,
    date_created TIMESTAMP DEFAULT NOW(),
    title TEXT,
    text TEXT,
    category TEXT,
    priority INTEGER,
    completed BOOLEAN DEFAULT FALSE,
    due_date DATE,
    assigned_to TEXT,
    notes TEXT,
    attachments TEXT,
    tags TEXT[]
);
With this code, the  tags  column is now defined as an array of strings using the  TEXT[]  data type. This would allow users to input multiple tags for each todo, which can make it easier to search and filter todos based on specific tags.
Question :

what about the notes and the attachments?
Answer :

Share icon
The  notes  and  attachments  columns could be defined as  json  or  jsonb  data types, which would allow users to store more complex or structured data. Here's an updated SQL code for creating the  todos  table with  jsonb  data types for the  notes  and  attachments  columns:
CREATE TABLE todos (
    todo_id SERIAL PRIMARY KEY,
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
With this code, the  notes  and  attachments  columns are now defined as  jsonb  data types. This would allow users to store more complex data such as structured notes, images, or other files related to the todo.  
Please keep in mind that this is just an example and you can modify the data types, column names and default values as per your specific requirements.
Question :

can you explain me what is the jsonb data type more deeply?
Answer :

Share icon
Sure, I'd be happy to help!  
 
JSONB is a PostgreSQL data type that allows you to store and manipulate JSON (JavaScript Object Notation) data as a binary format. It is similar to the JSON data type, but provides additional indexing functionality for faster searching and querying. 
 
JSONB data is stored in a compressed binary format, which allows for more efficient storage and faster indexing compared to the traditional text-based JSON data type. This makes it particularly useful for applications that handle large volumes of JSON data. 
 
With the JSONB data type, you can perform various operations such as indexing, searching, and filtering on the JSON data directly within PostgreSQL. You can also use various built-in JSON functions and operators to manipulate the data, including functions for extracting specific attributes or keys from the JSON data. 
 
In the case of the  notes  and  attachments  columns in the  todos  table, using the JSONB data type allows users to store more complex or structured data such as images, files, and other relevant data related to the todo. 
 
I hope this helps!
*/
