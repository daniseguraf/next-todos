'use client'

import { useState } from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import { createTodo, deleteCompletedTodos } from './services/todos.services'
import { useRouter } from 'next/navigation'
import {
  createTodoWithServerActions,
  deleteCompletedTodosWithServerActions,
} from './actions/todo.actions'

export const NewTodo = () => {
  const router = useRouter()
  const [description, setDescription] = useState('')

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await createTodoWithServerActions(description)
    setDescription('')
    // router.refresh()
    // await createTodo(description)
    // setDescription('')
    // router.refresh()
  }

  const handleDeleteCompleted = async () => {
    await deleteCompletedTodosWithServerActions()
  }

  return (
    <form className="flex w-full">
      <input
        type="text"
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
        onClick={(e) => handleSubmit(e)}
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={handleDeleteCompleted}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        Borrar completados
      </button>
    </form>
  )
}
