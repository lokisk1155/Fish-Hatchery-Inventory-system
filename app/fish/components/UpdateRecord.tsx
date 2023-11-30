'use client'
import { FishRecord } from 'app/api/fish/route'
import { useModal } from 'app/ModalContext'
import { FileEdit } from 'lucide-react'
import { MouseEvent } from 'react'

interface Props {
  fishData: FishRecord
}

export default function UpdateRecord({ fishData }: Props) {
  const { toggleModal, setModalProps } = useModal()

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault
    if (fishData) {
      setModalProps(fishData)
      toggleModal()
    }
  }

  return (
    <button
      className="p-1 min-w-[50px] bg-blue-500 hover:bg-blue-600  text-white flex items-center justify-center"
      onClick={handleUpdate}
    >
      <FileEdit />
    </button>
  )
}
