'use client'
import Loading from '@/components/Loading'
import { fishDataArray } from 'mockData/fish'
import { useEffect, useState } from 'react'
import Timeline from './Timeline'

export default function FishLayout() {
  const [isloading, setIsLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }, [])
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="items-start space-y-2 xl:grid xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2">
            {isloading ? <Loading /> : <Timeline recordedFishData={fishDataArray} />}
          </div>
        </div>
      </div>
    </>
  )
}
