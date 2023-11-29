'use client'
import { FishRecord } from 'app/api/fish/route'
import { useModal } from 'app/ModalContext'
import { MouseEvent } from 'react'
import { FileEdit } from 'lucide-react'
import DeleteRecord from './DeleteRecord'
import { useSession } from 'next-auth/react'

interface Props {
  fishData: FishRecord
}

export default function AdminTimelineButtons({ fishData }: Props) {
  const { toggleModal, setModalProps } = useModal()
  const session = useSession()

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault
    if (fishData) {
      setModalProps(fishData)
      toggleModal()
    }
  }

  return (
    <div className="absolute top-0 right-0 flex flex-col p-2">
      <DeleteRecord id={fishData.id} />
      <button
        className="p-1 min-w-[50px] bg-blue-500 hover:bg-blue-600  text-white flex items-center justify-center"
        onClick={handleUpdate}
      >
        <FileEdit />
      </button>
    </div>
  )
}
