import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { RequestClient } from "../../request/components/client";
import { RequestGroupColumn } from "../../request/components/column";
import { format } from "date-fns";

const EventDetailPage = async ({ params }: {
    params: { eventId: string, groupId: string }
}) => {
    const supabase = createClient();

    const { data , error } = await supabase
        .from("Event")
        .select("*")
        .eq("uuid", params.eventId);

    const { data: requestGroups, error: requestGroupError} = await supabase
        .from("RequestGroup")
        .select("*")
        .eq("eventId", params.eventId);
    
    if (error || !data || data.length < 1) {
        toast.error(`Error retriving event ${params.eventId}`);
        window.location.replace(`/admin/group/${params.groupId}/event`);
    }

    const event = data[0];

    if (requestGroupError || !requestGroups) {
        toast.error(`Error retriving Request Groups`);
    }
    let formattedGroups: RequestGroupColumn[] = []
  
    if (requestGroups) {
        formattedGroups = requestGroups.map((item) => ({
            id: item.id,
            groupId: item.groupId,
            name: item.name,
            type: item.type,
            createdAt: format(item.created_at, "MMMM do, yyyy"),
        }));
    }

    return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <Heading 
                title={event.name}
                description={event.description}
            />
            <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Event Date
                </p>
                <p className="text-sm text-muted-foreground">
                  {event.event_date}
                </p>
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Event Location
                </p>
                <p className="text-sm text-muted-foreground">
                  {event.location}
                </p>
            </div>
            <Separator />
            <RequestClient data={formattedGroups} />
        </div>
    </div>
    )
}

export default EventDetailPage;