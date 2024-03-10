"use client"

import { UserButton } from "@clerk/nextjs";

import { Button } from "./ui/button";
import { redirect } from "next/navigation";

const NavBar = ({ userId }: {
  userId: string | null
}) => {

  const onClick = () => {
    console.log("clicked");
    window.location.replace('/sign-in');
  }

  return ( 
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
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