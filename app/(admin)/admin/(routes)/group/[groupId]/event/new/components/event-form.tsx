"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import toast from "react-hot-toast"
import axios from "axios"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(5),
  groupId: z.string(),
  eventDate: z.date(),
  location: z.string(),
});

export const EventForm = ({ groupId }: {
  groupId : string
}) => {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          description: "",
          groupId: groupId,
          eventDate: undefined,
          location: "",
        },
      })
      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        console.log(values);
        try {
          const response = await axios.post('/api/event', {
              name: values.name,
              description: values.description,
              groupId: values.groupId,
              eventDate: values.eventDate,
              location: values.location,
          });
          toast.success("Submitted! See you on Game Night!");
          window.location.replace(`/admin/group/${groupId}/event/${response.data}`);
        } catch (error) {
          toast.error("Something went wrong. Please try submitting again.");
        } finally {
          setLoading(false);
        }
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="Some event name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Event description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row space-x-10">
            <FormField
                control={form.control}
                name="eventDate"
                render={({ field }) => (
                <FormItem className="space-y-2 flex flex-col pt-2">
                    <FormLabel className="leading-3 pb-1">Event Start Date & Time</FormLabel>
                    <FormControl>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                                date < new Date()
                            }
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Event Location</FormLabel>
                <FormControl>
                    <Input placeholder="Enter a location" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <Button type="submit" disabled={loading}>Submit</Button>
      </form>
    </Form>
  )
}
