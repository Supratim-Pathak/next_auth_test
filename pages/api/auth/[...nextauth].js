import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),

    CredentialsProvider({

      name: "credentials",

      async authorize(credentials, req) {
        console.log(credentials.email)
        const userData = {
          username:"supratim",
          password:"123",
        } 

        if (credentials.email =="") {
          throw new Error("No Email")
        }

        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

        if (credentials.email == userData.username && credentials.password == userData.password) {
          return user
        }else{
          return null
        }

      }
    })    
  ],
  pages: {
    signIn: "../../login",
    signOut: "../../login",
  },
  callbacks: {
    async session({ session, user, token }) {
      // console.log(session, 'session')
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
  },
  secret:process.env.SECRET
};

export default NextAuth(authOptions);
