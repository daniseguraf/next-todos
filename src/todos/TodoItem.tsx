import { Todo } from '@/generated/prisma/client'

export const TodoItem = ({ todo }: { todo: Todo }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {todo.description}
    </div>
  )
}
