'use client'
import { PageHeader } from '@/components/PageHeader'
import FishIndex from '../components/FishIndex'
import Loading from '@/components/Loading'
import FishGraph from '../components/FishGraph'
import FishBackButton from '../components/FishBackButton'
import NotFound from 'app/not-found'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { Role } from 'interfaces/session'

const requestUrl = process.env.NEXT_PUBLIC_URL + 'api/fish'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Page({ params }: { params: { id: string } }) {
  const session = useSession()

  const authenticatedAdmin =
    // @ts-ignore , role is provided during [...nextAuth]/route.ts jwt - session callback function
    session.data && session.data.user && session.data.user.role === Role.ADMIN ? true : false

  const { data, error, isLoading } = useSWR(requestUrl, fetcher)

  if (isLoading || error) {
    return <Loading />
  }

  const fishIndexEntryList = data.filter(({ tracking_code }) => tracking_code === params.id)

  const fishIndexData = fishIndexEntryList[0]

  return (
    <>
      {fishIndexData ? (
        <>
          <FishBackButton />
          <PageHeader title={fishIndexData.name} description={fishIndexData.tracking_code} />
          <div className="w-full h-full flex flex-col mb-20 justify-evenly md:flex-row">
            <FishIndex fish={fishIndexData} count={fishIndexEntryList.length} />
            {authenticatedAdmin && <FishGraph fishIndexEntryList={fishIndexEntryList} />}
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </>
  )
}
