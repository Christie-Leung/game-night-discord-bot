import { ApiList } from "@/components/ui/api-list";
import { RequestGroupAPI } from "./components/request-group-api";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { RequestAPI } from "./components/request-api";
import { GroupDataDialog } from "./components/group-data";
import { EventDataDialog } from "./components/event-data";
import { RequestGroupDataDialog } from "./components/request-group-data";
import { RequestDataDialog } from "./components/request-data";

const ApiPage = () => {
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex flex-row gap-x-4">
                    <Heading title="Group" />
                    <GroupDataDialog />
                </div>
                <ApiList entityName="group" entityIdName="groupId"/>
                
                <Separator />
                <div className="flex flex-row gap-x-4">
                    <Heading title="Event" />
                    <EventDataDialog />
                </div>
                <ApiList entityName="event" entityIdName="eventId"/>

                <Separator />
                <div className="flex flex-row gap-x-4">
                    <Heading title="Request Group" />
                    <RequestGroupDataDialog />
                </div>
                <RequestGroupAPI />

                <Separator />
                <div className="flex flex-row gap-x-4">
                    <Heading title="Request" />
                    <RequestDataDialog />
                </div>
                <RequestAPI />
            </div>
        </div>
    )
}

export default ApiPage;