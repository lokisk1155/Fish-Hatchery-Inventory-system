'use client'
import { FishRecord } from 'app/api/fish/route'
import useSWRMutation from 'swr/mutation'

async function handleClick(url: string, { arg }) {
  return await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  })
}

const requestUrl = process.env.NEXT_PUBLIC_URL + 'api/fish'

interface Props {
  fishData: FishRecord
}

export default function UpdateRecord({ fishData }: Props) {
  const { trigger, isMutating } = useSWRMutation(requestUrl, handleClick)

  const mockFish = {
    name: 'updated type',
    id: fishData.id,
    total_length: 1,
    weight: 1,
    tracking_code: fishData.tracking_code,
    images: '/static/images/ocean.jpeg',
    date_caught: new Date().toISOString(),
    type: 'updated type',
    location: 'updated type',
    lure: 'updated type',
  }

  return (
    <button
      className="p-2 min-w-[70px] bg-blue-500 hover:bg-blue-600 rounded text-white"
      onClick={() => trigger(mockFish)}
    >
      {isMutating ? 'Updating...' : 'Update'}
    </button>
  )
}
