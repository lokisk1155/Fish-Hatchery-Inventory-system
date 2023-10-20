import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  secret: 'SuperSecret',
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
          token.role = 'admin'
        } else {
          token.role = 'user'
        }
      }
      return token
    },
    session({ session, token }) {
      session.user.role = token.role
      return session
    },
  },
}
