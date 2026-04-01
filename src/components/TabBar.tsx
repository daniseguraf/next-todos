'use client'

import { useSetCookie } from 'cookies-next'
import { useState } from 'react'

interface TabBarProps {
  tabOptions?: number[]
  defaultTab?: number
}

export const TabBar = ({
  tabOptions = [1, 2, 3, 4, 5],
  defaultTab = 1,
}: TabBarProps) => {
  const [currentTab, setCurrentTab] = useState(defaultTab)
  const setCookie = useSetCookie()

  const handleTabChange = (tab: number) => {
    setCurrentTab(tab)
    setCookie('currentTab', tab.toString())
  }

  return (
    <div
      className={`grid w-full  space-x-2 rounded-xl bg-gray-200 p-2`}
      style={{
        gridTemplateColumns: `repeat(${tabOptions.length}, minmax(0, 1fr))`,
      }}
    >
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            type="radio"
            id={tab.toString()}
            value={tab}
            className="peer hidden"
            checked={currentTab === tab}
            onChange={() => {}}
          />
          <label
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  )
}
