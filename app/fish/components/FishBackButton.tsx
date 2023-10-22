'use client'

import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'

export default function FishBackButton() {
  const { push } = useRouter()

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    push('/fish')
  }
  
  return (
    <button
      className="px-4 py-2 rounded transition-transform transform hover:bg-blue-500 hover:text-white duration-200"
      onClick={handleClick}
    >
      {'< back'}
    </button>
  )
}
