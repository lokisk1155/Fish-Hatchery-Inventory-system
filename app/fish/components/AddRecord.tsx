'use client'
import { CreateRecord } from 'app/api/fish/route'
import { useSession } from 'next-auth/react'
import useSWRMutation from 'swr/mutation'

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]
const fishTypes = [
  'tuna',
  'barracuda',
  'perch',
  'mackerel',
  'salmon',
  'trout',
  'catfish',
  'carp',
  'bass',
]
const fishLocations = ['pond 1', 'pond 2', 'pond 3']
const fishLures = ['jigs', 'crank', 'spinner']

async function handleClick(url: string, { arg }) {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  })
}

const requestUrl = process.env.NEXT_PUBLIC_URL + 'api/fish'

interface Props {
  author_email: string
}

export default function AddRecord({ author_email }: Props) {
  const { trigger, isMutating } = useSWRMutation(requestUrl, handleClick)
  const session = useSession()

  const mockFish = {
    name: 'tuna',
    total_length: Math.floor(Math.random() * 100),
    weight: +(Math.random() * 10).toFixed(2),
    tracking_code: 'TC-8KTP3OCY',
    images: '/static/images/ocean.jpeg',
    date_caught: new Date().toISOString(),
    type: getRandom(fishTypes),
    location: getRandom(fishLocations),
    lure: getRandom(fishLures),
    author_email: author_email,
  }

  return (
    <div className="w-full items-start">
      <button
        className="w-full md:w-1/2 text-3xl hover:underline hover:bg-gray-200 dark:hover:bg-gray-800 border-solid border-[3px]"
        onClick={() => trigger(mockFish)}
      >
        {isMutating ? 'Creating...' : 'Create Record'}
      </button>
    </div>
  )
}
