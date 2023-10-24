import GoogleProvider from 'next-auth/providers/google'
import { set, ref, get, push } from 'firebase/database'
import sanitizeEmail from 'utils/sanitizeEmail'
import { DB } from '@/data/firebaseApp'

const tempStorage = new Map()

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      const urlObj = new URL(url)
      const role = urlObj.searchParams.get('role')

      if (role) {
        tempStorage.set(0, role)
      }

      return `${baseUrl}/login`
    },
    async jwt({ token }) {
      if (token) {
        const role = tempStorage.get(0)
        if (role) {
          token.role = role
          tempStorage.delete(0)
        }
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      return session
    },
  },
}
