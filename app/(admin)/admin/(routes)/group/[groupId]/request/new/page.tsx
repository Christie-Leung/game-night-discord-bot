import { Heading } from "@/components/ui/heading"
import { RequestForm } from "./components/request-form";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";

const RequestPage = async ({ params }: {
    params: { groupId: string, eventId?: string }
}) => {
    const supabase = createClient();

    const { data, error } = await supabase.from("Event")
    .select("uuid, name")
    .eq("groupId", params.groupId);

    let events: {uuid: any, name: any}[] = []
    if (data) {
        events = data.map((item) => ({
            name: item.name,
            uuid: item.uuid,
        }));
    }
    
    if (error) {
        toast.error("Error occurred fetching events");
    }

    return (
        <div className="w-full h-full flex items-center justify-center flex-col">
            <Heading title={"What's the new request?"}/>
            <RequestForm events={events}/>
        </div>
    )
}

export default RequestPage;

