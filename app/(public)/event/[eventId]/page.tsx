import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { redirect } from 'next/navigation';
import { format, parseISO } from "date-fns";
import { clerkClient } from "@clerk/nextjs";
import EventCard from "./components/event-card";

const IdeasPage = async ({ params }: {
    params: { eventId: string }
}) => {

    const supabase = createClient();

    const { data, error } = await supabase
        .from("Event")
        .select("*")
        .eq("uuid", params.eventId);
    console.log(data);
    let eventDetails = null;
    if (data) {
        eventDetails = data.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            eventDate: format(parseISO(item.event_date), "MMMM do, yyyy"),
            location: item.location,
            groupId: item.groupId,
        }))[0]
    }
    console.log(eventDetails);
    
    if (!eventDetails) {
        console.log(error);
        toast.error("Please ask the host to make sure you have the correct link!");
        redirect('/');
    }

    const { data: group, error: groupError } = await supabase
        .from("Group")
        .select("*")
        .eq("uuid", eventDetails.groupId);
    let groupDetails = null;
    if (group) {
        groupDetails = group.map((item) => ({
            name: item.name,
            adminId: item.adminId,
        }))[0]
    }
    console.log(groupDetails);
    
    if (!groupDetails) {
        console.log(groupError);
        toast.error("Please ask the host to make sure you have the correct link!");
        redirect('/');
    }

    const user = await clerkClient.users.getUser(groupDetails.adminId);
    const userDetails = {
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.hasImage ? user.imageUrl : ""
    }

    return (
        <div className="w-full h-full flex items-center justify-center flex-col">
            <EventCard eventDetails={eventDetails} userDetails={userDetails}/>
        </div>
    )
}

export default IdeasPage;

