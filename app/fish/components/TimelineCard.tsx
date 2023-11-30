'use client'
import CustomLink from '@/components/Link'
import { fishImages } from '@/data/fishTypes'
import { FishRecord } from 'app/api/fish/route'
import { Role } from 'interfaces/session'
import AdminButtons from './AdminButtons'

interface Props {
  fishData: FishRecord
  href: string
  role: Role | null
}
export default function TimelineCard({ fishData, href, role }: Props) {
  const width = role === Role.ADMIN ? 'w-3/4' : 'w-full'

  const dataPoints = [
    { label: 'Type', value: fishData.type },
    { label: 'Length', value: `${fishData.total_length} cm` },
    { label: 'Weight', value: `${fishData.weight} kg` },
    { label: 'Location', value: fishData.location },
    {
      label: 'Tracking Code',
      value: fishData.tracking_code,
      extraClass: 'text-xs text-gray-500 mt-2',
    },
    {
      label: 'Recorded on',
      value: new Date(fishData.date_caught).toISOString(),
      extraClass: 'text-xs text-gray-500',
    },
  ]

  return (
    <div
      className={`relative w-full flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center border border-gray-300 mt-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-bg-colors`}
    >
      <CustomLink className={`${width} flex items-center p-2`} href={href}>
        <img
          src={fishImages[fishData.type]}
          alt={fishData.name}
          className="w-24 h-24 object-cover mr-4 bg-white dark:bg-black"
        />
        <div className="flex flex-col">
          <h2 className="text-xl font-bold mb-2">{fishData.name.toUpperCase()}</h2>
          {dataPoints.map(({ label, value, extraClass = 'text-sm' }, index) => (
            <p key={index} className={extraClass}>
              <strong className="font-semibold">{label}:</strong> {value}
            </p>
          ))}
        </div>
      </CustomLink>
      {role === Role.ADMIN && <AdminButtons fishData={fishData} />}
    </div>
  )
}
