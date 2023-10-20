import { Role, SessionUser } from 'interfaces/session'
import { RecordedFishData } from 'mockData/fish'
import { useState } from 'react'
import TimelineIndex from './TimelineIndex'

interface Props {
  recordedFishData: Array<RecordedFishData>
  authenticated: boolean
  user: SessionUser | null
}

enum ToggleState {
  RECENT = 'RECENT',
  DATED = 'DATED',
  POPULAR = 'POPULAR',
}

export default function Timeline({ recordedFishData, authenticated, user }: Props) {
  let role = Role.GUEST
  if (authenticated && user) {
    role = user.role
  }

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

  const sortedDataMapping = {
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

  const filterButtonsData = [
    { state: ToggleState.RECENT, label: 'most recent' },
    { state: ToggleState.DATED, label: 'most dated' },
    { state: ToggleState.POPULAR, label: 'most caught' },
  ]

  return (
    <>
      <div className="w-full divide-y divide-gray-200 dark:divide-gray-700">
        <div className="items-start space-y-2 xl:gap-x-8 xl:space-y-0">
          {/* sort fish buttons */}
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
          <div className="flex flex-col items-center pt-8 w-full">
            {sortedDataMapping[toggle].map((fishData, index) => (
              <TimelineIndex
                fishData={fishData}
                key={index}
                countMap={map}
                href={`/fish/${fishData.tracking_code}`}
                role={role}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
