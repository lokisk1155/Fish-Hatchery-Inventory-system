'use client'

import { FishRecord } from 'app/api/fish/route'
import { useEffect, useState } from 'react'

interface Props {
  close: () => void
  fishData?: FishRecord
}

export default function CreateUpdateFishModal({ close, fishData }: Props) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <div className="absolute w-[100vw] h-[100vh] bg-black ">yo</div>
}
