import prisma from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const take = Number(searchParams.get('take') || '10')
  const skip = Number(searchParams.get('skip') || '0')

  if (isNaN(take) || isNaN(skip)) {
    return NextResponse.json({ error: 'Invalid take or skip' }, { status: 400 })
  }

  const todos = await prisma.todo.findMany({
    take,
    skip,
  })

  return NextResponse.json(todos)
}

export async function POST(request: Request) {
  const { description } = await request.json()

  console.log('description', description)

  const todo = await prisma.todo.create({
    data: { description },
  })

  return NextResponse.json(todo)
}
