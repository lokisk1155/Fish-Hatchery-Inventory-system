import { PageHeader } from '@/components/PageHeader'
import FishIndex from '../components/FishIndex'
import Loading from '@/components/Loading'
import FishGraph from '../components/FishGraph'
import FishBackButton from '../components/FishBackButton'
import NotFound from 'app/not-found'
import { FishRecord } from 'app/api/fish/route'

const requestUrl = process.env.NEXT_PUBLIC_URL + 'api/fish'

export default async function Page({ params }: { params: { id: string } }) {
  const request = await fetch(requestUrl)
  const fishDataArray: Array<FishRecord> = await request.json()

  if (!fishDataArray) {
    return <Loading />
  }

  const fishIndexEntryList = fishDataArray.filter(
    ({ tracking_code }) => tracking_code === params.id
  )

  const fishIndexData = fishIndexEntryList[0]

  return (
    <>
      {fishIndexData ? (
        <>
          <FishBackButton />
          <PageHeader title={fishIndexData.name} description={fishIndexData.tracking_code} />
          <div className="w-full h-full flex flex-col mb-20 justify-evenly md:flex-row">
            <FishIndex fish={fishIndexData} count={fishIndexEntryList.length} />
            <FishGraph fishIndexEntryList={fishIndexEntryList} />
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </>
  )
}
