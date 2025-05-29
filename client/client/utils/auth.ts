import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions, User } from 'next-auth';
import axios from 'axios';

const backendUrl = process.env.BACKEND_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        role: { label: 'Role', type: 'text' }, // e.g. vendor | delivery | customer
        action: { label: 'Action', type: 'text' }, // login | signup
      },
      async authorize(credentials: Record<"email" | "password" | "role" | "action", string> | undefined) {
        if (!credentials) return null;

        const { email, password, role, action } = credentials;

        try {
          const endpoint = action === 'signup' 
            ? `${backendUrl}/api/auth/${role}/signup`
            : `${backendUrl}/api/auth/${role}/login`;

          const response = await axios.post(endpoint, { email, password });
          console.log(response.data)
          const user = response.data?.user;
          console.log(user)

          if (!user) return null;

          return {
            id: user.id,
            email: user.email,
            token : response.data.token,
            role: role,
          } as User
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      console.log("token userr : ",user)
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.token = user.token
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("session userr : ",session)
      console.log("session token : ",token)

      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.token = token.token as string
        session.user.email = token.email as string;
      }
      console.log("logged in as user : ",session)
      return session;
    },
  },
  pages: {
    signIn: '/signin',
    error: '/auth/error', // Optional
  },
};
