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
      className="p-1 min-w-[75px] bg-red-500 hover:bg-red-600 text-white"
      onClick={() => trigger(id)}
    >
      {isMutating ? 'deleting...' : 'delete'}
    </button>
  )
}
