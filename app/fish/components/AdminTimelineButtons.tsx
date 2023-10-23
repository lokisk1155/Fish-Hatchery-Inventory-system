'use client'
import { FishRecord } from 'app/api/fish/route'
import { useModal } from '../page'
import DeleteRecord from './DeleteRecord'

interface Props {
  fishData: FishRecord
}

export default function AdminTimelineButtons({ fishData }: Props) {
  const { toggleModal, setModalProps } = useModal()

  const handleUpdate = () => {
    if (fishData) {
      setModalProps(fishData)
      toggleModal()
    }
  }

  return (
    <div className="h-full w-1/4 flex flex-col items-center justify-start space-y-2">
      <button
        className="p-2 min-w-[70px] bg-blue-500 hover:bg-blue-600 rounded text-white"
        onClick={handleUpdate}
      >
        update
      </button>
      <DeleteRecord id={fishData.id} />
    </div>
  )
}
