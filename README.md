## Todo Page

This is a Next.js 13.4 page using the new app router and the new feature "server actions". It is a simple todo page where you can store your tasks list.

## Getting Started

To get started, clone this repository and install the dependencies:

`npm install`

Then, start the development server:

`The page will be available at localhost:3000`.

## Features

This todo page has the following features:

- You can create, edit, and delete tasks.
- You can mark tasks as completed.
- You can filter tasks by category.
- You can search for tasks.

## Data Model

The data model for this todo page is as follows:
`{
    "todos": [
        {
            "id": 1,
            "title": "Buy milk",
            "text": "Buy milk from the store",
            "category": "Groceries",
            "priority": 1,
            "completed": false,
            "due_date": "2023-05-15",
            "assigned_to": null,
            "notes": null,
            "attachments": null,
            "tags": []
        },
        {
            "id": 2,
            "title": "Do laundry",
            "text": "Wash and fold the laundry",
            "category": "Household chores",
            "priority": 2,
            "completed": false,
            "due_date": "2023-05-16",
            "assigned_to": null,
            "notes": null,
            "attachments": null,
            "tags": []
        }
    ]
}`
