import prisma from '@/app/lib/prisma'
import { NextResponse } from 'next/server'
import * as yup from 'yup'

type Params = {
  id: string
}

export async function GET(
  request: Request,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params

  const todo = await prisma.todo.findUnique({
    where: { id },
  })

  if (!todo) {
    return NextResponse.json({ error: `Todo ${id} not found` }, { status: 404 })
  }

  return NextResponse.json(todo)
}

const updateSchema = yup
  .object({
    description: yup.string().optional(),
    completed: yup.boolean().optional(),
  })
  .noUnknown(true, 'No se permiten propiedades adicionales')
  .strict(true)

export async function PATCH(
  request: Request,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params
    const todo = await prisma.todo.findUnique({
      where: { id },
    })

    if (!todo) {
      return NextResponse.json(
        { error: `Todo ${id} not found` },
        { status: 404 }
      )
    }

    const { description, completed } = await updateSchema.validate(
      await request.json()
    )

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { description, completed },
    })

    return NextResponse.json(updatedTodo)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
