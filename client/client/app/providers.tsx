"use client"
import {SessionProvider} from "next-auth/react"
import { ReactNode } from "react";
import { Toaster } from "sonner";

function Providers({ children }:{children : ReactNode }) {

    return (
        <SessionProvider>
            <Toaster position="top-right"/>
            {children}
        </SessionProvider>
    );
}

export default Providers;
   