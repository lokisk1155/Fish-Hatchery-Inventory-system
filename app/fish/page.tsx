'use client'
import Loading from '@/components/Loading'
import Timeline from './components/Timeline'
import { SessionUser } from 'interfaces/session'
import { PageHeader } from '@/components/PageHeader'
import { fishPageHeaderProps } from '@/data/pageHeader'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'

const requestUrl = process.env.NEXT_PUBLIC_URL + 'api/fish'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Page() {
  const { data, error, isLoading } = useSWR(requestUrl, fetcher)
  const session = useSession()

  return (
    <>
      <PageHeader title={fishPageHeaderProps.title} description={fishPageHeaderProps.description} />
      <div className="flex flex-col items-center space-x-2">
        {data && !isLoading ? (
          <Timeline
            recordedFishData={data}
            user={
              session && session.data && session.data.user
                ? (session.data.user as SessionUser)
                : null
            }
          />
        ) : (
          <Loading />
        )}
      </div>
    </>
  )
}
