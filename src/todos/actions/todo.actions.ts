'use server'
import prisma from '@/app/lib/prisma'
import { Todo } from '@/generated/prisma/client'
import { revalidatePath } from 'next/cache'

export const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const updateTodoWithServerActions = async (
  id: string,
  completed: boolean
) => {
  await sleep(3000)

  const todo = await prisma.todo.findUnique({
    where: { id },
  })

  if (!todo) {
    return { error: 'Todo not found' }
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { completed },
  })

  revalidatePath('/dashboard/server-actions')
  return updatedTodo
}

// const postSchema = yup
//   .object({
//     description: yup.string().required(),
//     completed: yup.boolean().optional().default(false),
//   })
//   .noUnknown(true, 'No se permiten propiedades adicionales')
//   .strict(true)

export const createTodoWithServerActions = async (
  description: string
): Promise<Todo> => {
  const todo = await prisma.todo.create({
    data: { description },
  })

  revalidatePath('/dashboard/server-actions')

  return todo
}

export const deleteCompletedTodosWithServerActions = async () => {
  await prisma.todo.deleteMany({
    where: { completed: true },
  })

  revalidatePath('/dashboard/server-actions')
}
