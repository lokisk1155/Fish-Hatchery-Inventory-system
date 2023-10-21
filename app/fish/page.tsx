import { PageHeader } from '@/components/PageHeader'
import { FIREBASE_DB } from '@/data/firebaseApp'
import { guestPageHeaderProps } from '@/data/pageHeader'
import { genPageMetadata } from 'app/seo'
import FishLayout from './components/FishLayout'

export const metadata = genPageMetadata({ title: 'Timeline' })

export default function Page() {
  return (
    <>
      <PageHeader
        title={guestPageHeaderProps.title}
        description={guestPageHeaderProps.description}
      />
      <FishLayout />
    </>
  )
}
