'use client'
import { PageHeader } from '@/components/PageHeader'
import Loading from '@/components/Loading'
import FishGraph from '../components/FishGraph'
import FishBackButton from '../components/FishBackButton'
import NotFound from 'app/not-found'
import useSWR from 'swr'
import { FishRecord } from 'app/api/fish/route'
import FishDetails from '../components/FishDetails'

const requestUrl = process.env.NEXT_PUBLIC_URL + 'api/fish'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Page({ params }: { params: { id: string } }) {
  const { data, error, isLoading } = useSWR(requestUrl, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 10000,
  })

  if (isLoading) {
    return <Loading />
  }

  const fishIndexEntryList = data.filter(({ tracking_code }) => tracking_code === params.id)

  const sortByMostRecent = fishIndexEntryList.sort(
    (a: FishRecord, b: FishRecord) => +new Date(b.date_caught) - +new Date(a.date_caught)
  )

  const fishIndexData = sortByMostRecent[0]

  if (error || !fishIndexData) {
    return <NotFound />
  }

  return (
    <>
      <FishBackButton />
      <PageHeader title={fishIndexData.name} description={fishIndexData.tracking_code} />
      <div className="w-full h-full flex flex-col mb-20 justify-evenly md:flex-row">
        <FishDetails fish={fishIndexData} count={fishIndexEntryList.length} />
        <FishGraph fishIndexEntryList={fishIndexEntryList} />
      </div>
    </>
  )
}
