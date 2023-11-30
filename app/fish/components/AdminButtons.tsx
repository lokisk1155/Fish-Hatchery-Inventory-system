import { FishRecord } from 'app/api/fish/route'
import DeleteRecord from './DeleteRecord'
import UpdateRecord from './UpdateRecord'

interface Props {
  fishData: FishRecord
}

export default function AdminButtons({ fishData }: Props) {
  return (
    <div className="absolute top-0 right-0 flex flex-col p-2">
      <DeleteRecord id={fishData.id} />
      <UpdateRecord fishData={fishData} />
    </div>
  )
}
