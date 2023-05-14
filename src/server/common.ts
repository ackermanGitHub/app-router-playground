import { z } from 'zod';

export const todoInputSchema = z.object({
  user_id: z.string().optional().nullable(),
  title: z.string().max(32).optional().nullable(),
  text: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  priority: z.number().int().optional().nullable(),
  due_date: z.date().optional().nullable(),
  assigned_to: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  attachments: z.string().optional().nullable(),
  tags: z.array(z.string()).optional().nullable(),
});

export const todoSchema = z.object({
  todo_id: z.number().int().positive(),
  user_id: z.string().optional().nullable(),
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
});

export const todosArraySchema = z.array(todoSchema);

export function absValue(
  value: string[] | Date | number | string | undefined | null
): string {
  let res = '';

  switch (typeof value) {
    case 'string':
      res = `'${value}'`;
      break;
    case 'number':
      res = `${value}`;
      break;
    case 'object':
      if (value instanceof Date) {
        res = `'${value.toISOString()}'`;
      }
      if (value instanceof Array) {
        res = `ARRAY[${value.map((value) => absValue(value))}]`;
      }
      if (value === null) {
        res = 'NULL';
      }
      break;
    default:
      return '';
  }

  return res;
}
