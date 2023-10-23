'use client'
import React, { MouseEvent } from 'react'
import DeleteRecord from './DeleteRecord'

interface Props {
  id: string
}

export default function AdminTimelineButtons({ id }: Props) {
  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('edit')
  }

  return (
    <div className="h-full w-1/4 flex flex-col items-center justify-start space-y-2">
      <button
        className="p-2 min-w-[70px] bg-blue-500 hover:bg-blue-600 rounded text-white"
        onClick={handleEdit}
        aria-label="Edit"
      >
        update
      </button>
      <DeleteRecord id={id} />
    </div>
  )
}
