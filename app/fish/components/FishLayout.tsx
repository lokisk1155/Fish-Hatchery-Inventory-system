'use client'
import Loading from '@/components/Loading'
import { fishDataArray } from 'mockData/fish'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Timeline from './Timeline'
import { SessionUser } from 'interfaces/session'

export default function FishLayout() {
  const session = useSession()
  const authenticated = session.status === 'authenticated' ? true : false
  const [isloading, setIsLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 850)
  }, [])
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="items-start space-y-2 xl:grid xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2">
            {isloading ? (
              <Loading />
            ) : (
              <Timeline
                recordedFishData={fishDataArray}
                authenticated={authenticated}
                user={authenticated && session.data ? (session.data.user as SessionUser) : null}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
