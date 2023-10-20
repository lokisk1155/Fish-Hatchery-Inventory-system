'use client'
import { signOut } from 'next-auth/react'
import { MouseEvent } from 'react'
import { SessionUser } from '../page'
import AdminLayout from './AdminLayout'
import UserLayout from './UserLayout'

enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

interface Props {
  user: SessionUser
}

export default function InventoryLayout({ user }: Props) {
  const handleSignOut = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await signOut()
  }
  return (
    <>
      <button
        className="w-1/2 text-3xl hover:underline hover:bg-gray-200 dark:hover:bg-gray-800 border-solid border-[3px]"
        onClick={handleSignOut}
      >
        logout
      </button>
      {user.role === Role.ADMIN ? <AdminLayout user={user} /> : <UserLayout user={user} />}
    </>
  )
}
