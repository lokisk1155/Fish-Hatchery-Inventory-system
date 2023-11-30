'use client'
import useSWRMutation from 'swr/mutation'
import { XSquare } from 'lucide-react'
import { handleDelete } from 'utils/triggers'

interface Props {
  id: string
}

export default function DeleteRecord({ id }: Props) {
  const { trigger, isMutating } = useSWRMutation('api/fish', handleDelete)

  return (
    <button
      className="p-1 min-w-[50px] bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
      onClick={() => trigger(id)}
    >
      {isMutating ? 'deleting...' : <XSquare />}
    </button>
  )
}
