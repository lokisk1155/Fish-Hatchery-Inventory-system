import { Role } from 'interfaces/session'
import { RecordedFishData } from 'mockData/fish'
import React, { MouseEvent } from 'react'
import TimelineCard from './TimelineCard'

interface Props {
  fishData: RecordedFishData
  href: string
  role: Role
}

export default function TimelineIndex({ fishData, href, role }: Props) {
  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('delete')
  }

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('edit')
  }

  let children = <></>
  if (role === Role.ADMIN) {
    children = (
      <>
        <TimelineCard fishData={fishData} href={href} role={role} />
        <div className="h-full w-1/4 flex flex-col items-center justify-start space-y-2">
          <button
            className="p-2 min-w-[70px] bg-blue-500 hover:bg-blue-600 rounded text-white"
            onClick={handleEdit}
            aria-label="Edit"
          >
            update
          </button>
          <button
            className="p-2 min-w-[70px] bg-red-500 hover:bg-red-600 rounded text-white"
            onClick={handleDelete}
            aria-label="Delete"
          >
            delete
          </button>
        </div>
      </>
    )
  } else {
    children = <TimelineCard fishData={fishData} href={href} role={role} />
  }

  return (
    <div className="w-full flex flex-row items-center justify-evenly border border-gray-300 rounded-md my-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-bg-colors">
      {children}
    </div>
  )
}
