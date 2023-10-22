'use client'

import { getToken } from 'next-auth/jwt'
import { useSession } from 'next-auth/react'

const requestUrl = process.env.NEXT_PUBLIC_URL + 'api/fish'

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

export default function AddRecord() {
  const handleClick = async () => {
    const mockFish = {
      name: 'Whiskers',
      total_length: Math.floor(Math.random() * 100),
      weight: +(Math.random() * 10).toFixed(2),
      tracking_code: 'TC-8KTP3OCY',
      images: '/static/images/ocean.jpeg',
      date_caught: new Date().toISOString(),
      type: getRandom(fishTypes),
      location: getRandom(fishLocations),
      lure: getRandom(fishLures),
    }

    try {
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockFish),
      })

      await response.json()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="w-full items-start">
      <button
        className="w-full md:w-1/2 text-3xl hover:underline hover:bg-gray-200 dark:hover:bg-gray-800 border-solid border-[3px]"
        onClick={handleClick}
      >
        add record
      </button>
    </div>
  )
}
