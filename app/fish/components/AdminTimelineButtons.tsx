'use client'
import { FishRecord } from 'app/api/fish/route'
import DeleteRecord from './DeleteRecord'
import UpdateRecord from './UpdateRecord'

interface Props {
  fishData: FishRecord
}

export default function AdminTimelineButtons({ fishData }: Props) {
  return (
    <div className="h-full w-1/4 flex flex-col items-center justify-start space-y-2">
      <UpdateRecord fishData={fishData} />
      <DeleteRecord id={fishData.id} />
    </div>
  )
}
