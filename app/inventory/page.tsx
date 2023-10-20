'use client'
import { PageHeader } from '@/components/PageHeader'
import { adminPageHeaderProps } from '@/data/pageHeader'
import { useSession } from 'next-auth/react'
import InventoryLayout from './components/InventoryLayout'
import UserLogin from './components/UserLogin'

export default function Page() {
  const session = useSession()
  const authenticated = session.status === 'authenticated' ? true : false
  let title = adminPageHeaderProps.title
  let description = adminPageHeaderProps.description

  if (session.status === 'authenticated' && session.data.user) {
    title = session.data.user.name || 'Not Found'
    description = 'welcome back, access granted to view inventory records'
  }

  return (
    <>
      <PageHeader title={title} description={description} />
      {authenticated ? <InventoryLayout /> : <UserLogin />}
    </>
  )
}
