'use client'
import { fishFormFields, fishLures, fishTypes } from '@/data/fishTypes'
import { FishRecord } from 'app/api/fish/route'
import { MouseEvent, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { handleCreate, handleUpdate } from 'utils/triggers'
import { formatToDateTime } from 'utils/formatToDateTime'

interface Props {
  fishData: FishRecord | null
  close: () => void
}

export default function FishRecordForm({ fishData, close }: Props) {
  const { trigger, isMutating } = useSWRMutation('api/fish', fishData ? handleUpdate : handleCreate)

  const [formData, setFormData] = useState({
    name: fishData?.name || '',
    total_length: fishData?.total_length || 0,
    weight: fishData?.weight || 0,
    tracking_code: fishData?.tracking_code || '',
    date_caught: fishData?.date_caught || '',
    type: fishData?.type || 'tuna',
    location: fishData?.location || 'pond 1',
    lure: fishData?.lure || 'jigs',
  })

  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    const submitData = {
      ...formData,
    }

    if (fishData && fishData.id) {
      submitData['id'] = fishData.id
    }

    trigger(submitData)
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
      <header className="flex flex-row items-center justify-between w-full">
        <h1>{fishData ? 'Update Fish Record' : 'Create Fish Record'}</h1>
        <button type="button" onClick={handleClose}>
          x
        </button>
      </header>

      {fishFormFields.map((field, index) => (
        <div key={index} className="w-full flex flex-col pt-4">
          {field.label && <label htmlFor={`${index}`}>{field.label}</label>}
          <input
            id={`${index}`}
            placeholder={field.placeholder}
            required
            value={formData[field.key]}
            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      ))}
      <div className="w-full flex flex-col pt-4">
        <label htmlFor="date-caught">{'Date Caught:'}</label>
        <input
          id="date-caught"
          type="datetime-local"
          placeholder="date"
          required
          value={formatToDateTime(formData.date_caught)}
          onChange={(e) => setFormData({ ...formData, date_caught: e.target.value })}
          className="w-full border border-gray-300 rounded-md"
        />
      </div>
      <label htmlFor="location">Location:</label>
      <select
        id="location"
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

      <label htmlFor="fish-type">Type:</label>
      <select
        id="fish-type"
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

      <label htmlFor="lure-type">Lure:</label>
      <select
        id="lure-type"
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
