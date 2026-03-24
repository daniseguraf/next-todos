import prisma from '@/app/lib/prisma'
import { TodosGrid } from '@/todos/TodosGrid'

const RestTodosPage = async () => {
  const todos = await prisma.todo.findMany()

  return (
    <div>
      <h1>Rest Todos</h1>

      <TodosGrid todos={todos} />
    </div>
  )
}

export default RestTodosPage
