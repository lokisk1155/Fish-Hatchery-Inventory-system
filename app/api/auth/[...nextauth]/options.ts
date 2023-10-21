import GoogleProvider from 'next-auth/providers/google'
import { set, ref, get, Database } from 'firebase/database'
import { getDB } from '@/data/firebaseApp'
import sanitizeEmail from 'utils/sanitizeEmail'
import { Role } from 'interfaces/session'

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
      const sanitizedEmail = sanitizeEmail(session.user.email)
      const DB = await getDB()
      const userRef = ref(DB as Database, `users/${sanitizedEmail}`)
      const snapshot = await get(userRef)
      if (!snapshot.exists()) {
        set(userRef, {
          username: session.user.name,
          role: session.user.role,
        })
      }
      return session
    },
  },
}
