'use client'
import { Role } from 'interfaces/session'
import { signIn } from 'next-auth/react'
import { MouseEvent } from 'react'

export default function UserLoggedOut() {
  const handleSignInAdmin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await signIn('google', {
      callbackUrl: `${window.location.origin}/api/auth/callback/google?role=${Role.ADMIN}`,
    })
  }
  const handleSignInUser = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await signIn('google', {
      callbackUrl: `${window.location.origin}/api/auth/callback/google?role=${Role.USER}`,
    })
  }
  return (
    <div className="w-full flex flex-col items-start">
      <button
        className="w-full md:w-1/2 text-3xl hover:underline hover:bg-gray-200 dark:hover:bg-gray-800 border-solid border-[3px]"
        onClick={handleSignInAdmin}
      >
        login as admin
      </button>
      <button
        className="w-full md:w-1/2 text-3xl hover:underline hover:bg-gray-200 dark:hover:bg-gray-800 border-solid border-[3px] mt-4"
        onClick={handleSignInUser}
      >
        login as user
      </button>
    </div>
  )
}
