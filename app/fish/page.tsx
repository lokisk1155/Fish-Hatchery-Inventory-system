import Loading from '@/components/Loading'
import Timeline from './components/Timeline'
import { SessionUser } from 'interfaces/session'
import { PageHeader } from '@/components/PageHeader'
import { fishPageHeaderProps } from '@/data/pageHeader'
import { getServerSession } from 'next-auth'
import { authOptions } from 'app/api/auth/[...nextauth]/options'
import { FishRecord } from 'app/api/fish/route'

const requestUrl = process.env.NEXT_PUBLIC_URL + 'api/fish'

export default async function Page() {
  const request = await fetch(requestUrl)
  const fishDataArray: Array<FishRecord> = await request.json()
  const session = await getServerSession(authOptions)

  return (
    <>
      <PageHeader title={fishPageHeaderProps.title} description={fishPageHeaderProps.description} />
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
    </>
  )
}
