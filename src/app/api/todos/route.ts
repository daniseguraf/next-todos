import prisma from '@/app/lib/prisma'
import { NextResponse } from 'next/server'
import * as yup from 'yup'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const take = Number(searchParams.get('take') || '10')
  const skip = Number(searchParams.get('skip') || '0')

  if (isNaN(take) || isNaN(skip)) {
    return NextResponse.json({ error: 'Invalid take or skip' }, { status: 400 })
  }

  const todos = await prisma.todo.findMany({
    skip,
    take,
    orderBy: {
      createdAt: 'asc',
    },
  })

  return NextResponse.json(todos)
}

const postSchema = yup
  .object({
    description: yup.string().required(),
    completed: yup.boolean().optional().default(false),
  })
  .noUnknown(true, 'No se permiten propiedades adicionales')
  .strict(true)

export async function POST(request: Request) {
  try {
    const body = await postSchema.validate(await request.json())

    const todo = await prisma.todo.create({
      data: body,
    })

    return NextResponse.json(todo)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}

export async function DELETE() {
  const todos = await prisma.todo.deleteMany({
    where: { completed: true },
  })

  return NextResponse.json(todos)
}
