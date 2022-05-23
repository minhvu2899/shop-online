import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
// import AppleProvider from "next-auth/providers/apple"
import EmailProvider from "next-auth/providers/email";
import axios from "axios";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "../../../lib/mongodb";
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers/oauth
  // adapter: MongoDBAdapter(clientPromise),
  // secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      // profile(profile) {
      //   return {
      //     // Return all the profile information you need.
      //     // The only truly required field is `id`
      //     // to be able identify the account when added to a database
      //   };
      // },
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "PetProject",

      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/login`,
          credentials
        );
        if (data.user) {
          return {
            name: data.user.name,
            email: data.user.email,
            image: data.user.image,
          };
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  theme: {
    brandColor: "#F6A192",
    colorScheme: "light",
    logo: "https://images.unsplash.com/photo-1650347325180-b3bf3ec76105?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
  },
  callbacks: {
    async jwt({ token }) {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signupProvider`,
        {
          name: token.name,
          email: token.email,
          image: token.picture,
        }
      );
      token.id = data.userId;
      return {
        userId: token.id,
        email: token.email,
        picture: token.picture,
        name: token.name,
      };
    },
    // async redirect({ url, baseUrl }) {
    //   // return baseUrl ?? "/";
    //   return url ?? baseUrl;
    // },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
