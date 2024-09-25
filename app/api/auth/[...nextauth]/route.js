import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials'
import connection from "@/lib/db";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},

            async authorize(credentials){
                const {email,password} = credentials

                try {
                    const query = 'select * from userinfo where email = ?'
                    const variable = [email]

                    const [result] = await connection.query(query,variable)
                    const user = result[0]

                    if(result.length == 0){
                        return null
                    }

                    const passwordMatched = user.password === password
                    if(!passwordMatched){
                        return null
                    }

                    return user
                } catch (error) {
                    
                }

                return user
            }
        })
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/"
    }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}