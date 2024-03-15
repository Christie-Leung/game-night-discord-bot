import { RequestGroupInfo } from "@/components/ui/request-group-info";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { Timer } from "@/components/ui/timer";
import { Button } from "@/components/ui/button";

const RequestGroupInfoPage = async ({ params }: {
  params: { requestGroupId: string }
}) => {

  let { name, requestCount } = {name: "", requestCount: 0};
  const supabase = createClient();

  const { data: requestData, error } = await supabase.from("Request")
    .select("*")
    .eq("requestGroupId", params.requestGroupId);
  
  
  const { data: groupData, error: gError } = await supabase.from("RequestGroup")
    .select("*")
    .eq("id", params.requestGroupId);

  if (error || gError) {
    toast.error("An error has occured.")
    console.log(error);
    console.log(gError);
  } 

  name = groupData ? groupData[0].name : "";
  requestCount = requestData?.length || 0;
  
  // const startDate = groupData ? groupData[0].startDate : Date.now();
  // console.log(startDate);
  // const timeStamp = new Date(startDate - Date.now())

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <RequestGroupInfo 
            name={name} 
            requestCount={requestCount} 
            requestGroupId={params.requestGroupId} 
          />
          <Separator />
          <Timer expiryTimestamp={0} />
        </div>
      </div>
    )

}
//<Timer expiryTimestamp={timeStamp} />

export default RequestGroupInfoPage;