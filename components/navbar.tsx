"use client"

import { UserButton } from "@clerk/nextjs";

import { Button } from "./ui/button";
import Link from "next/link";
import { ThemeToggle } from "./ui/theme-toggle";

const NavBar = ({ userId }: {
  userId?: string | null
}) => {

  return ( 
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link
          key={userId ? "/admin" : "/"}
          href={userId ? "/admin" : "/"}
          className="mx-6 text-sm font-medium transition-colors hover:text-primary hover:underline"
        >
          Home
        </Link>
        
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="secondary" onClick={() => window.location.replace('/api')}>API</Button>
        { userId ? 
          <UserButton afterSignOutUrl="/"/>
        : 
        <>
          <Button variant="outline" onClick={() =>  window.location.replace('/sign-in')}>Log In</Button>
          <Button onClick={() =>  window.location.replace('/sign-in')}>Sign Up</Button>
        </>
        }
        <ThemeToggle />
        </div>
      </div>
    </div>
   );
}
 
export default NavBar;