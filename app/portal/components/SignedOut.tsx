'use client'
import { Role } from 'interfaces/session'
import { signIn } from 'next-auth/react'
import { MouseEvent } from 'react'

export default function SignedOut() {
  /* 
    
    The current method of handling user roles, where the role is specified in the URL, poses a severe security risk. 
    This approach allows a user to easily modify the role parameter to a higher privilege level, such as 'Admin', 
    granting them unauthorized access to sensitive areas of the application. To mitigate this risk, it's advisable 
    to store user roles securely within a database. This ensures that role information is not exposed in the URL 
    and cannot be tampered with by the users.

    But for a simple demo of this application, this is an optimal solution as security is not a high concern.

    */

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
