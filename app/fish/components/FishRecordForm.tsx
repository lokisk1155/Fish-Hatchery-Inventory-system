'use client'
import { fishFormFields, fishLures, fishTypes } from '@/data/fishTypes'
import { FishRecord } from 'app/api/fish/route'
import { MouseEvent, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { formatToDateTime } from 'utils/formatToDateTime'

const requestUrl = process.env.NEXT_PUBLIC_URL + 'api/fish'

async function handleCreate(url: string, { arg }) {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  })
}

async function handleUpdate(url: string, { arg }) {
  return await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  })
}

interface Props {
  fishData: FishRecord | null
  close: () => void
  author_email: string
}

export default function FishRecordForm({ author_email, fishData, close }: Props) {
  const { trigger, isMutating } = useSWRMutation(requestUrl, fishData ? handleUpdate : handleCreate)

  const [formData, setFormData] = useState({
    name: fishData?.name || '',
    total_length: fishData?.total_length || 0,
    weight: fishData?.weight || 0,
    tracking_code: fishData?.tracking_code || '',
    date_caught: fishData?.date_caught || '',
    type: fishData?.type || 'tuna',
    location: fishData?.location || 'pond 1',
    lure: fishData?.lure || 'jigs',
    author_email: author_email,
  })

  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    const sanatizedData = {
      ...formData,
    }

    if (fishData && fishData.id) {
      sanatizedData['id'] = fishData.id
    }

    trigger(sanatizedData)
    close()
  }

  const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    close()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start justify-evenly  text-black p-4 min-w-[300px]"
    >
      <div className="flex flex-row items-center justify-between w-full">
        <h1>{fishData ? 'Update Fish Record' : 'Create Fish Record'}</h1>
        <button onClick={handleClose}>x</button>
      </div>

      {fishFormFields.map((field, index) => (
        <div key={index} className="w-full flex flex-col pt-4">
          {field.label && <span>{field.label}</span>}
          <input
            type={field.type}
            placeholder={field.placeholder}
            required
            value={formData[field.key]}
            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      ))}
      <div className="w-full flex flex-col pt-4">
        <span>{'Date Caught:'}</span>
        <input
          type="datetime-local"
          placeholder="date"
          required
          value={formatToDateTime(formData.date_caught)}
          onChange={(e) => setFormData({ ...formData, ['date_caught']: e.target.value })}
          className="w-full border border-gray-300 rounded-md"
        />
      </div>
      <span>Location:</span>
      <select
        required
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded-md pt-2"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <option key={i} value={`pond ${i + 1}`}>
            Pond {i + 1}
          </option>
        ))}
      </select>

      <span>Type:</span>
      <select
        required
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        {fishTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <span>Lure:</span>
      <select
        required
        value={formData.lure}
        onChange={(e) => setFormData({ ...formData, lure: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        {fishLures.map((lure) => (
          <option key={lure} value={lure}>
            {lure}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full text-3xl text-white hover:underline bg-green-500 hover:bg-green-600 border-solid mt-4"
      >
        {isMutating ? 'loading...' : 'Submit'}
      </button>
    </form>
  )
}
