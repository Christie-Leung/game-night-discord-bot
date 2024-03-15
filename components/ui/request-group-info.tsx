"use client" 

import { Link1Icon } from "@radix-ui/react-icons"
import { Heading } from "./heading"
import { useOrigin } from "@/hooks/use-origin"
import { Button } from "./button"
import { redirect } from "next/navigation"

export const RequestGroupInfo = ({ name, requestCount, requestGroupId }: {
  name: string,
  requestCount: number,
  requestGroupId: string,
}) => {

  const baseURL = useOrigin();
  console.log(baseURL);

  return (
    <>
      <Heading title={`Group Request: ${name}`}/>
      <span>Current count: {requestCount}</span>
      <div className="flex grow items-center mt-2 space-x-2">
        <Button 
          variant="default" 
          className="gap-x-2"
          onClick={() => window.location.replace(`${baseURL}/request/${requestGroupId}`)}>
          <Link1Icon />
          Request Link
        </Button>
      </div>
    </>
  )
}