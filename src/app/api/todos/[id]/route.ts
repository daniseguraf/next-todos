import prisma from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const todo = await prisma.todo.findUnique({
    where: { id },
  })

  if (!todo) {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
  }

  return NextResponse.json(todo)
}
