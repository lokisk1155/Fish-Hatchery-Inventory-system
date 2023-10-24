'use client'
import { FishRecord } from 'app/api/fish/route'
import { useModal } from 'app/ModalContext'
import { MouseEvent } from 'react'
import DeleteRecord from './DeleteRecord'

interface Props {
  fishData: FishRecord
}

export default function AdminTimelineButtons({ fishData }: Props) {
  const { toggleModal, setModalProps } = useModal()

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault
    if (fishData) {
      setModalProps(fishData)
      toggleModal()
    }
  }

  return (
    <div className="absolute top-0 right-0 flex flex-col">
      <DeleteRecord id={fishData.id} />
      <button
        className="p-1 min-w-[75px] bg-blue-500 hover:bg-blue-600  text-white"
        onClick={handleUpdate}
      >
        update
      </button>
    </div>
  )
}
