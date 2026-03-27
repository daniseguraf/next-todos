'use client'

import { Todo } from '@/generated/prisma/client'
import { TodoItem } from './TodoItem'
import { updateTodo } from './services/todos.services'
import { useRouter } from 'next/navigation'
import { updateTodoWithServerActions } from './actions/todo.actions'

interface TodosGridProps {
  todos?: Todo[]
}

export const TodosGrid = ({ todos }: TodosGridProps) => {
  const router = useRouter()

  // const handleUpdateTodo = async (id: string, completed: boolean) => {
  //   await updateTodo(id, completed)

  //   router.refresh()
  // }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
      {todos?.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={updateTodoWithServerActions}
        />
      ))}
    </div>
  )
}
