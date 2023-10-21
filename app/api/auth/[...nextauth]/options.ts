import GoogleProvider from 'next-auth/providers/google'
import { set, ref, get, push, Database } from 'firebase/database'
import sanitizeEmail from 'utils/sanitizeEmail'
import { Role } from 'interfaces/session'
import { getDB } from '@/data/firebaseApp'

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        if (user.email === process.env.ADMIN_EMAIL) {
          token.role = Role.ADMIN
        } else {
          token.role = Role.USER
        }
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      const DB = await getDB()
      const sanitizedEmail = sanitizeEmail(session.user.email)
      const idLookupRef = ref(DB as Database, `emailToIdLookup/${sanitizedEmail}`)
      const userIdSnapshot = await get(idLookupRef)
      let userId = userIdSnapshot.val()
      if (!userId) {
        const newUserRef = push(ref(DB as Database, 'users'))
        userId = newUserRef.key

        await set(newUserRef, {
          username: session.user.name,
          role: session.user.role,
          email: session.user.email,
        })

        await set(idLookupRef, userId)
      }
      return session
    },
  },
}
