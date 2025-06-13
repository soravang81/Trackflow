import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string,
            name : string,
            email : string,
            token : string
            image : string
            role : string 
        };
    }

    interface User extends DefaultUser {
        id: string,
        name : string,
        email : string
        token : string,
        image : string
        role : string 
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string,
        name : string,
        email : string
        token : string
        image : string
        role : string 
    }
}
