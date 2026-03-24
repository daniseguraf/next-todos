import { Todo } from '@/generated/prisma/client'
import { TodoItem } from './TodoItem'

interface TodosGridProps {
  todos?: Todo[]
}

export const TodosGrid = ({ todos }: TodosGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
      {todos?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
