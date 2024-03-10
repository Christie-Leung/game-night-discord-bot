"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { CopyIcon, PlusIcon } from "lucide-react"
import toast from "react-hot-toast"

type EventDetailsProps = {
    id: string,
    name: string,
    description: string,
    eventDate: string,
    location: string,
    groupId: string
}

const EventCard = ({ eventDetails, userDetails }: {
    eventDetails: EventDetailsProps
    userDetails: any
}) => {
    return (
    <Card className={"w-96"}>
        <CardHeader>
            <CardTitle>{eventDetails.name}</CardTitle>
            <CardDescription className={"flex flex-row items-center gap-x-2"}>
                {userDetails.image && 
                <Avatar className={"w-8 h-8"}>
                    <AvatarImage src={userDetails.image} alt="userImage" />
                </Avatar>}
                Hosted by {userDetails.firstName} 
            </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            {eventDetails.description}
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-x-2">
            <p className="text-sm text-muted-foreground">
                Meet us on {eventDetails.eventDate} @ {eventDetails.location}
            </p>
            <Button variant="outline" onClick={() => {
                navigator.clipboard.writeText(`https://x-night-ideas.vercel.app/public/event/${eventDetails}`);
                toast.success('Copied link to clipboard');
            }}>
                <CopyIcon />
                Copy
            </Button>
        </CardFooter>
    </Card>
    )
}

export default EventCard;

/*
            <Button variant="outline" onClick={() => 
                navigator.clipboard.writeText(`https://x-night-ideas.vercel.app/public/event/${params.eventId}`)
            }>
                <PlusIcon />
                Add Request
            </Button>
            */