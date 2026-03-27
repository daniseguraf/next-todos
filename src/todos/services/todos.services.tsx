import { Todo } from '@/generated/prisma/client'

export const createTodo = async (description: string): Promise<Todo> => {
  const response = await fetch(`/api/todos`, {
    method: 'POST',
    body: JSON.stringify({ description }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to create todo')
  }

  return response.json()
}

export const updateTodo = async (
  id: string,
  completed: boolean
): Promise<Todo> => {
  const response = await fetch(`/api/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ completed }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response.json()
}

export const deleteCompletedTodos = async (): Promise<Todo> => {
  const response = await fetch(`/api/todos/`, {
    method: 'DELETE',
  })

  return response.json()
}
