'use client'
import { PageHeader } from '@/components/PageHeader'
import Loading from '@/components/Loading'
import FishGraph from '../components/FishGraph'
import FishBackButton from '../components/FishBackButton'
import NotFound from 'app/not-found'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { Role } from 'interfaces/session'
import FishCard from '../components/FishCard'
import { FishRecord } from 'app/api/fish/route'
import { DB } from '@/data/firebaseApp'
import { onValue, ref } from 'firebase/database'
import { arrayEquals } from 'utils/arrayEquals'

const requestUrl = process.env.NEXT_PUBLIC_URL + 'api/fish'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Page({ params }: { params: { id: string } }) {
  const session = useSession()

  const authenticatedAdmin =
    // @ts-ignore [...nextAuth]/route.ts redirect -> jwt -> session gives user.role, server side understands but not client
    session.data && session.data.user && session.data.user.role === Role.ADMIN ? true : false

  const { data, error, isLoading, mutate } = useSWR(requestUrl, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 5000,
  })

  const fishRef = ref(DB, '/fish')
  onValue(fishRef, (snapshot) => {
    const innerData = snapshot.val()
    if (innerData && !arrayEquals(innerData, data)) {
      // unable to get mutate working thus far
      // the server will log "hit" on realtime updates from firebases onValue function
      console.log('HIT')
      mutate(innerData)
    }
  })

  if (isLoading || error) {
    return <Loading />
  }

  const fishIndexEntryList = data.filter(({ tracking_code }) => tracking_code === params.id)

  const sortByMostRecent = fishIndexEntryList.sort(
    (a: FishRecord, b: FishRecord) => +new Date(b.date_caught) - +new Date(a.date_caught)
  )

  const fishIndexData = sortByMostRecent[0]

  return (
    <>
      {fishIndexData ? (
        <>
          <FishBackButton />
          <PageHeader title={fishIndexData.name} description={fishIndexData.tracking_code} />
          <div className="w-full h-full flex flex-col mb-20 justify-evenly md:flex-row">
            <FishCard fish={fishIndexData} count={fishIndexEntryList.length} />
            {authenticatedAdmin && <FishGraph fishIndexEntryList={fishIndexEntryList} />}
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </>
  )
}
