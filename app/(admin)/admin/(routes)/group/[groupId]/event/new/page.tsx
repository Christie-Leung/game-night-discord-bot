import { Heading } from "@/components/ui/heading"
import { EventForm } from "./components/event-form";

const EventCreationPage = ({ params }: {
    params: { groupId: string }
}) => {
    return (
        <div className="w-full h-full flex items-center justify-start mt-20 flex-col space-y-4">
            <Heading title={"What event are you hosting?"}/>
            <EventForm groupId={params.groupId} />
        </div>
    )
}

export default EventCreationPage;

