import CustomLink from '@/components/Link'
import { Role, SessionUser } from 'interfaces/session'
import { RecordedFishData } from 'mockData/fish'
import React from 'react'
import TimelineCard from './TimelineCard'

interface Props {
  fishData: RecordedFishData
  href: string
  countMap: { [key: string]: number }
  role: Role
}

export default function TimelineIndex({ fishData, href, countMap, role }: Props) {
  if (role === Role.ADMIN) {
    return <TimelineCard fishData={fishData} href={href} countMap={countMap} />
  } else if (role === Role.USER) {
    return <TimelineCard fishData={fishData} href={href} countMap={countMap} />
  } else {
    return <TimelineCard fishData={fishData} href={href} countMap={countMap} />
  }
}
