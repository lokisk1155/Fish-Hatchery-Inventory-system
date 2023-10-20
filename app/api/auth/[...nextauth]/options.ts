import GoogleProvider from 'next-auth/providers/google'

enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

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
    session({ session, token }) {
      session.user.role = token.role
      return session
    },
  },
}
