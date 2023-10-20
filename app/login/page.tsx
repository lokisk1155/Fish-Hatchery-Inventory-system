'use client'
import { PageHeader } from '@/components/PageHeader'
import { adminPageHeaderProps } from '@/data/pageHeader'
import { useSession } from 'next-auth/react'
import UserLogin from './components/UserLogin'
import UserLogout from './components/UserLogout'

export default function Page() {
  const session = useSession()
  const authenticated = session.status === 'authenticated' ? true : false
  const title = adminPageHeaderProps.title
  let description = adminPageHeaderProps.description

  if (session.status === 'authenticated' && session.data.user) {
    // @ts-ignore user.role is always added from jwt auth callback (api/auth/[...nextauth]/options.ts), not apart of native session
    description = `signed in as ${session.data.user.name} | role: ${session.data.user.role}`
  }

  return (
    <>
      <PageHeader title={title} description={description} />
      {authenticated && session.data && session.data.user ? <UserLogout /> : <UserLogin />}
    </>
  )
}
