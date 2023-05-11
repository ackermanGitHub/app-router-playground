import { db } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const client = await db.connect();

  try {
    await client.sql`
      CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        caption VARCHAR(300),
        likes INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `;
    await client.sql`
      INSERT INTO posts (user_id, image_url, caption, likes) 
      VALUES (1, 'https://example.com/image.jpg', 'This is a caption for the post', 10);
    `;
  } catch (error) {
    return response.status(500).json({ error });
  }

  const posts = await client.sql`SELECT * FROM posts;`;
  return response.status(200).json({ posts });
}

/* 
Bito: Sure, here are some example SQL queries to help you create the tables and populate them with data: 
 
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
