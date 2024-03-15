"use client"

import { useParams } from 'next/navigation';
import React from 'react';
import { useTimer } from 'react-timer-hook';
import { Button } from "@/components/ui/button";

const Timer = ({ expiryTimestamp }) => {
  const {
    seconds,
    minutes,
    hours,
    days
  } = useTimer({ 
    expiryTimestamp,
    onExpire: () => console.warn('onExpire called') 
    })

  const params = useParams();

  return (
    <div className='flex flex-col w-full items-center px-4'>
    <div className="text-center">      
      <div className="text-6xl">
        <span className="text-9xl">{String(days).padStart(2, "0")}</span>:
        <span>{String(hours).padStart(2, "0")}</span>:
        <span>{String(minutes).padStart(2, "0")}</span>:
        <span>{String(seconds).padStart(2, "0")}</span>
      </div>
    </div>
    { !expiryTimestamp && 
     <Button 
      variant="default" 
      className='flex self-center'
      onClick={() => window.location.replace(`/admin/request-group/${params.requestGroupId}/generate`)}
    >
      Generate
    </Button>
    }
   </div>
  );
}

export { Timer };