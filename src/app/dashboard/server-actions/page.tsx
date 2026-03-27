import prisma from '@/app/lib/prisma'
import { NewTodo } from '@/todos/NewTodo'
import { TodosGrid } from '@/todos/TodosGrid'

const ServerActionsPage = async () => {
  const todos = await prisma.todo.findMany()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">Server Actions</h1>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />
    </div>
  )
}

export default ServerActionsPage
