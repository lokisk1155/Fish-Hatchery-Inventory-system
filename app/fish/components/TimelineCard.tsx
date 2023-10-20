'use client'

import CustomLink from '@/components/Link'
import { RecordedFishData } from 'mockData/fish'

interface Props {
  fishData: RecordedFishData
  href: string
  countMap: { [key: string]: number }
}

export default function TimelineCard({ fishData, href, countMap }: Props) {
  return (
    <CustomLink className="w-3/4 flex items-center p-2" href={href}>
      <img
        src={fishData.images}
        alt={fishData.name}
        className="w-24 h-24 rounded-full object-cover mr-4"
      />
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-2">{fishData.name.toUpperCase()}</h2>
        <p className="text-sm">
          <strong className="font-semibold">Total Length:</strong> {fishData.total_length} cm
        </p>
        <p className="text-sm">
          <strong className="font-semibold">Weight:</strong> {fishData.weight} kg
        </p>
        <p className="text-sm">
          <strong className="font-semibold">caught count:</strong>{' '}
          {countMap[fishData.tracking_code]}
        </p>
        <p className="text-xs text-gray-500 mt-2">Tracking Code:{fishData.tracking_code}</p>
        <p className="text-xs text-gray-500 mt-2">
          Recorded on: {new Intl.DateTimeFormat('en-US').format(fishData.date_caught)}
        </p>
      </div>
    </CustomLink>
  )
}
