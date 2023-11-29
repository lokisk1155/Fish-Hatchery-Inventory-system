'use client'
import { fishImages } from '@/data/fishTypes'
import { FishRecord } from 'app/api/fish/route'
import { useModal } from 'app/ModalContext'
import { Role, SessionUser } from 'interfaces/session'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import TimelineCard from './TimelineCard'

interface Props {
  recordedFishData: Array<FishRecord>
  user: SessionUser | null
}

enum ToggleState {
  RECENT = 'RECENT',
  DATED = 'DATED',
  POPULAR = 'POPULAR',
}

export default function Timeline({ recordedFishData, user }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const fishType = searchParams.get('type')
  const { toggleModal } = useModal()

  const [toggle, setToggle] = useState<ToggleState>(ToggleState.RECENT)
  const map: { [key: string]: number } = {}
  /* individual_tracking_code = number of times it has appeared */
  recordedFishData.forEach((fishEntry) => {
    if (map[fishEntry.tracking_code]) {
      map[fishEntry.tracking_code] += 1
    } else {
      map[fishEntry.tracking_code] = 1
    }
  })

  let sortedDataMapping = {
    [ToggleState.RECENT]: [...recordedFishData].sort(
      (a, b) => +new Date(b.date_caught) - +new Date(a.date_caught)
    ),
    [ToggleState.DATED]: [...recordedFishData].sort(
      (a, b) => +new Date(a.date_caught) - +new Date(b.date_caught)
    ),
    [ToggleState.POPULAR]: [...recordedFishData].sort(
      (a, b) => map[b.tracking_code] - map[a.tracking_code]
    ),
  }

  if (fishType) {
    sortedDataMapping[toggle] = sortedDataMapping[toggle].filter((fish) => fish.type === fishType)
  }

  const filterButtonsData = [
    { state: ToggleState.RECENT, label: 'most recent' },
    { state: ToggleState.DATED, label: 'most dated' },
    { state: ToggleState.POPULAR, label: 'most caught' },
  ]

  const removeSearchParams = (e) => {
    e.preventDefault()
    router.replace(pathname)
  }

  return (
    <div className="w-full items-start space-y-2 xl:gap-x-8 xl:space-y-0">
      {filterButtonsData.map(({ state, label }) => (
        <button
          key={state}
          className={`${
            toggle === state ? 'outline-none ring-2 ring-indigo-500' : ''
          } w-[200px] transition duration-300 ease-in-out transform bg-gradient-to-r py-3 px-6`}
          onClick={() => setToggle(state)}
        >
          {label}
        </button>
      ))}
      {fishImages[fishType] ? (
        <button
          className={`w-[200px] transition duration-300 ease-in-out transform bg-gradient-to-gray py-3 px-6`}
          onClick={removeSearchParams}
        >
          {`${fishType} X`}
        </button>
      ) : (
        ''
      )}
      <div className="flex flex-col items-center pt-8 w-full">
        {user && user.role === Role.ADMIN ? (
          <div className="w-full items-start">
            <button
              className="w-full md:w-1/2 text-3xl hover:underline hover:bg-gray-200 dark:hover:bg-gray-800 border-solid border-[3px]"
              onClick={() => toggleModal()}
            >
              {'Create Record'}
            </button>
          </div>
        ) : null}
        {sortedDataMapping[toggle].map((fishData, index) => (
          <TimelineCard
            fishData={fishData}
            key={index}
            href={`/fish/${fishData.tracking_code}`}
            role={user && user.role ? user.role : null}
          />
        ))}
      </div>
    </div>
  )
}
