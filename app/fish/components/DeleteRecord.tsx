'use client'
import useSWRMutation from 'swr/mutation'

async function handleClick(url: string, { arg }) {
  return await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  })
}

const requestUrl = process.env.NEXT_PUBLIC_URL + 'api/fish'

interface Props {
  id: string
}

export default function DeleteRecord({ id }: Props) {
  const { trigger, isMutating } = useSWRMutation(requestUrl, handleClick)

  return (
    <button
      className="p-2 min-w-[70px] bg-red-500 hover:bg-red-600 rounded text-white"
      onClick={() => trigger(id)}
    >
      {isMutating ? 'Deleting...' : 'Delete'}
    </button>
  )
}
