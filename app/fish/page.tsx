import Loading from '@/components/Loading'
import Timeline from './components/Timeline'
import { SessionUser } from 'interfaces/session'
import { PageHeader } from '@/components/PageHeader'
import { guestPageHeaderProps } from '@/data/pageHeader'
import { getServerSession } from 'next-auth'
import { authOptions } from 'app/api/auth/[...nextauth]/options'
import { RecordedFishData } from 'mockData/fish'

const requestUrl = process.env.NEXT_PUBLIC_URL + 'api/fish'

export default async function Page() {
  const request = await fetch(requestUrl)
  const fishDataArray: Array<RecordedFishData> = await request.json()
  const session = await getServerSession(authOptions)

  return (
    <>
      <PageHeader
        title={guestPageHeaderProps.title}
        description={guestPageHeaderProps.description}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="items-start space-y-2 xl:grid xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2">
            {fishDataArray.length ? (
              <Timeline
                recordedFishData={fishDataArray}
                user={session ? (session.user as SessionUser) : null}
              />
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
