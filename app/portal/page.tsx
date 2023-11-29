import LayoutWrapper from '@/components/LayoutWrapper'
import { PageHeader } from '@/components/PageHeader'
import { loginPageHeaderProps } from '@/data/pageHeader'
import { authOptions } from 'app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import ActiveUser from './components/ActiveUser'
import SignedOut from './components/SignedOut'

export default async function Page() {
  const session = await getServerSession(authOptions)
  const authenticated = session && session.user ? true : false
  const title = loginPageHeaderProps.title
  let description = loginPageHeaderProps.description

  if (authenticated) {
    description = `signed in as ${session.user.name} | role: ${session.user.role}`
  }

  return (
    <LayoutWrapper>
      <PageHeader title={title} description={description} />
      {authenticated ? <ActiveUser /> : <SignedOut />}
    </LayoutWrapper>
  )
}
