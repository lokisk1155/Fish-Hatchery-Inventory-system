'use client'
import CustomLink from '@/components/Link'
import { FishRecord } from 'app/api/fish/route'
import { Role } from 'interfaces/session'
import AdminTimelineButtons from './AdminTimelineButtons'

interface Props {
  fishData: FishRecord
  href: string
  role: Role
}

export default function TimelineCard({ fishData, href, role }: Props) {
  const width = role === Role.ADMIN ? 'w-3/4' : 'w-full'
  return (
    <div className="relative w-full flex flex-row items-center justify-evenly border border-gray-300 mt-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-bg-colors">
      <CustomLink className={`${width} flex items-center p-2`} href={href}>
        <img
          src={fishData.images}
          alt={fishData.name}
          className="w-24 h-24 rounded-full object-cover mr-4"
        />
        <div className="flex flex-col">
          <h2 className="text-xl font-bold mb-2">{fishData.name.toUpperCase()}</h2>
          <p className="text-sm">
            <strong className="font-semibold">Type:</strong> {fishData.type}
          </p>
          <p className="text-sm">
            <strong className="font-semibold">Length:</strong> {fishData.total_length} cm
          </p>
          <p className="text-sm">
            <strong className="font-semibold">Weight:</strong> {fishData.weight} kg
          </p>
          <p className="text-sm">
            <strong className="font-semibold">Location:</strong> {fishData.location}
          </p>
          <p className="text-xs text-gray-500 mt-2">Tracking Code:{fishData.tracking_code}</p>
          <p className="text-xs text-gray-500">
            Recorded on: {new Date(fishData.date_caught).toISOString()}
          </p>
        </div>
      </CustomLink>
      {role === Role.ADMIN && <AdminTimelineButtons fishData={fishData} />}
    </div>
  )
}
