"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import toast from "react-hot-toast";

type Request = {
  name: string,
  description: string,
  requestGroupId: string,
  userId: string,
}

export const GenerateForm = ({ params }: {
  params: { requestGroupId: string }
}) => {
    const [generate, setGenerate] = useState([]);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(5);

    const supabase = createClient();

    const onGenerate = async () => {
      setLoading(true);
      supabase.functions.invoke
      
    let { data: result, error } = await supabase
    .rpc('generate', {
      count, 
      id: params.requestGroupId
    });


      if (result) {
          setGenerate(result);
          console.log(result);
      }

      if (error) {
        toast.error("An error has occured!");
        console.log(error);
      }
        
      setLoading(false);
    }

    return (
      <div className="flex grow space-y-4 flex-col items-center justify-center">
        <div>
          <Label>Options: </Label>
          <Input 
            placeholder={count.toString()}
            onChange={(e) => setCount(parseInt(e.target.value))} />
        </div>
        { generate.length == 0 && 
        <Button variant="default" disabled={loading} onClick={onGenerate}>
          GENERATE!
        </Button>
        }
        { loading && <Loader className="fill-pink-600" /> }
        { generate &&
          <div className="mx-8 max-w-xl">
            {generate.map((request: any) => (
              <div key={request.name} className="flex flex-col space-x-2 my-4">
                <Badge className="max-w-fit">{request.name}</Badge>
                <span>{request.description}</span>
              </div>
            ))}

          </div>
        }
      </div>
    )
}
