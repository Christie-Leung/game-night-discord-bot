"use client"

import { UserButton } from "@clerk/nextjs";

import { Button } from "./ui/button";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";

const NavBar = ({ userId }: {
  userId: string | null
}) => {

  const pathname = usePathname();
  console.log(pathname)
  const onClick = () => {
    console.log("clicked");
    window.location.replace('/sign-in');
  }

  return ( 
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {userId && 
          <Link
            key="/admin"
            href="/admin"
            className="mx-6 text-sm font-medium transition-colors hover:text-primary hover:underline"
          >Home
          </Link>
        }
        { userId ? <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/"/>
        </div>
        : 
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="outline" onClick={onClick}>Log In </Button>
          <Button onClick={onClick}>Sign Up </Button>
        </div>}
      </div>
    </div>
   );
}
 
export default NavBar;