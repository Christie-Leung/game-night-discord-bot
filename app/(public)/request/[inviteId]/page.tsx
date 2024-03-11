import { Heading } from "@/components/ui/heading"
import { IdeaForm } from "./components/idea-form";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { RocketIcon } from "@radix-ui/react-icons"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { format, parseISO } from "date-fns";
import { redirect } from 'next/navigation';

const IdeasPage = async ({ params }: {
    params: { inviteId: string }
}) => {

    const supabase = createClient();

    const { data: rqDetails, error: rqError } = await supabase
        .from("RequestGroup")
        .select("*")
        .eq("id", params.inviteId);

    let details = null;
    if (rqDetails) {
        details = rqDetails.map((item) => ({
            name: item.name,
            groupId: item.groupId,
            type: item.type,
            eventId: item.eventId,
        }))[0]
    }
    
    if (!details) {
        console.log(rqError);
        toast.error("Please ask the host to make sure you have the correct link!");
        redirect('/');
    }

    const { data: groups, error: groupError } = await supabase
        .from("Group")
        .select("*")
        .eq("uuid", details.groupId);

    if (groupError || !groups) {
        console.log(groupError);
        toast.error("Error occurred fetching group");
    }

    let groupDetails = null;

    if (groups) {
        groupDetails = groups.map((item) => ({
            name: item.name,
            adminId: item.adminId,
        }))[0]
    }
    
    let eventDetails = null;
    
    if (details.eventId) {
        const { data: event, error: eventError } = await supabase
        .from("Event")
        .select("*")
        .eq("uuid", details.eventId);

        if (eventError || !event) {
            console.log(groupError);
            toast.error("Error occurred fetching event");
        }

        if (!groupDetails) {
            console.log(groupDetails);
            toast.error("Please ask the host to make sure you have the correct link!");
            redirect('/');
        }

        if (event) {
            eventDetails = event.map((item) => ({
                id: item.uuid,
                name: item.name,
                description: item.description,
                eventDate: item.event_date,
                location: item.location,
            }))[0]
        }

    }

    return (
        <div className="w-full grow flex items-center justify-center flex-col">
            <div className="w-11/12 max-w-fit space-y-4 flex flex-col items-center">
            <Heading 
                title={"Put in your requests!"}
                description={eventDetails ? `Your input is needed for ${eventDetails.name}` : groupDetails ? `Your input is needed for ${groupDetails.name} to continue hosting great events!` : "" }
            />
            {eventDetails && 
                <div className="mt-5 space-y-4">
                    <Alert>
                        <RocketIcon className="h-4 w-4" />
                        <AlertTitle>Event Reminder!</AlertTitle>
                        <AlertDescription>
                            {eventDetails.name} is happening on {format(parseISO(eventDetails.eventDate), "MMMM do, yyyy")} at {eventDetails.location}.

                            <br />
                            <br />
                            Description: {eventDetails.description}
                        </AlertDescription>
                    </Alert>
                </div>
            }
            <IdeaForm inviteId={params.inviteId} id={eventDetails ? eventDetails.id : null}/>
            </div>
        </div>
    )
}

export default IdeasPage;

