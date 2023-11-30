import GoogleProvider from 'next-auth/providers/google'

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

      return `${baseUrl}/portal`
    },
    async jwt({ token }) {
      const role = tempStorage.get(0)
      if (role) {
        token.role = role
        tempStorage.delete(0)
      }
      return token
    },
    async session({ session, token }) {
      /*

        Rather than determining a user's role solely based on the information in the token, 
        a more secure approach involves querying the database to retrieve the user's role. This approach 
        would allow for the secure retrevial of a user based on email and provider which are given by the
        session. Once obtained, this role should be added to both session.user and the token as a custom
        property. This method ensures that the role assignment is based on the latest and most accurate 
        data from the database, enhancing security and integrity of the user's session

      */
     
      session.user.role = token.role
      return session
    },
  },
}
