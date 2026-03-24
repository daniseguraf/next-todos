'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarItemProps {
  path: string
  icon: React.ReactNode
  title: string
}

export const SidebarItem = ({ path, icon, title }: SidebarItemProps) => {
  const pathname = usePathname()
  const isActive = pathname === path

  return (
    <li>
      <Link
        href={path}
        className={` px-4 py-3 flex items-center space-x-4 rounded-md hover:bg-gray-100  ${
          isActive
            ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400'
            : 'text-gray-600'
        }`}
      >
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  )
}
