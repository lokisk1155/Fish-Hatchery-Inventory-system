'use client'
import { MouseEvent, useEffect, useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { fishDataArray } from 'mockData/fish'
import { useRouter } from 'next/navigation'
import FishIndex from '../components/FishIndex'
import Loading from '@/components/Loading'
import FishGraph from '../components/FishGraph'

export default function Page({ params }: { params: { id: string } }) {
  const { push } = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }, [])

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    push('/fish')
  }

  const fishIndexData = fishDataArray.find(({ tracking_code }) => tracking_code === params.id)
  const fishIndexEntryList = fishDataArray.filter(
    ({ tracking_code }) => tracking_code === params.id
  )

  const map: { [key: string]: number } = {}
  /* individual_tracking_code = number of times it has appeared */
  fishDataArray.forEach((fishEntry) => {
    if (map[fishEntry.tracking_code]) {
      map[fishEntry.tracking_code] += 1
    } else {
      map[fishEntry.tracking_code] = 1
    }
  })

  return (
    <>
      {fishIndexData && !isLoading ? (
        <>
          <button
            className="px-4 py-2 rounded transition-transform transform hover:bg-blue-500 hover:text-white duration-200"
            onClick={handleClick}
          >
            {'< back'}
          </button>
          <PageHeader title={fishIndexData.name} description={fishIndexData.tracking_code} />
          <div className="w-full h-full flex flex-col mb-20 justify-evenly md:flex-row">
            <FishIndex fish={fishIndexData} count={map[fishIndexData.tracking_code]} />
            <FishGraph fishIndexEntryList={fishIndexEntryList} />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}
