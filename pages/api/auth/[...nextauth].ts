import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
export default NextAuth({
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
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "ShopOnline",

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
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`,
            credentials
          );
          if (data.user) {
            return {
              name: data.user.name,
              email: data.user.email,
              image: data.user.image,
            };
          }
          return null;
        } catch (error) {
          return null;
        }

        // Return null if user data could not be retrieved
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
      try {
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
      } catch (error) {
        return token;
      }
    },
    async redirect({ url, baseUrl }) {
      // return baseUrl ?? "/";

      return url ?? baseUrl;
    },
  },
  // pages: {
  //   signIn: "/auth/signin",
  // },
});
