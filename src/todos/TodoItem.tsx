'use client'

import { Todo } from '@/generated/prisma/client'
import styles from './TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5'
import { startTransition, useOptimistic } from 'react'

interface TodoItemProps {
  todo: Todo
  onToggleTodo: (id: string, completed: boolean) => void
}

export const TodoItem = ({ todo, onToggleTodo }: TodoItemProps) => {
  const [optimisticTodo, setOptimisticTodo] = useOptimistic(
    todo,
    (currentState, newCompletedValue: boolean) => ({
      ...currentState,
      completed: newCompletedValue,
    })
  )

  const handleToggleTodoOptimistic = () => {
    startTransition(() => {
      setOptimisticTodo(!optimisticTodo.completed)
    })

    onToggleTodo(optimisticTodo.id, !optimisticTodo.completed)
  }

  return (
    <div
      className={
        optimisticTodo.completed ? styles.todoDone : styles.todoPending
      }
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          className="flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 bg-blue-100"
          onClick={handleToggleTodoOptimistic}
        >
          {optimisticTodo.completed ? (
            <IoCheckboxOutline size={20} />
          ) : (
            <IoSquareOutline size={20} />
          )}
        </div>
        <div className="text-center sm:text-left text-black">
          {optimisticTodo.description}
        </div>
      </div>
    </div>
  )
}
