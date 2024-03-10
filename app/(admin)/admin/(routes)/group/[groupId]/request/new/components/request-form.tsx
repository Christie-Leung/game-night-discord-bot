"use client"

import { zodResolver } from "@hookform/resolvers/zod"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast from "react-hot-toast"
import axios from "axios"
import { useState } from "react"
import { useParams } from "next/navigation"

const formSchema = z.object({
    name: z.string().min(1),
    type: z.string().min(1),
    eventId: z.string(),
  });
  
  export const RequestForm = ({ events }: {
    events: {uuid: any, name: any}[]
  }) => {
    const [loading, setLoading] = useState(false);
    const params = useParams();
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        type: "",
        eventId: "",
      },
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      console.log(values);
      try {
        setLoading(true);
  
        const url = values.eventId ? `/api/requestGroup/group/${params.groupId}/event/${values.eventId}`
        : `/api/requestGroup/group/${params.groupId}`;
        const response = await axios.post(url, values);
  
        window.location.assign(`/request/${response}`);
        toast.success("Request Group created.")
      } catch (error) {
        toast.error("Something went wrong.")
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input 
                disabled={loading} 
                placeholder="Group Name" 
                {...field}
              />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Request Type</FormLabel>
            <FormControl>
              <Input 
                disabled={loading} 
                placeholder="Request Category" 
                {...field}
              />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      { events && params?.eventId == null && 
        <FormField
          control={form.control}
          name="eventId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event (Optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an Event" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {events.map((event) => 
                    <SelectItem key={event.uuid} value={event.uuid}>{event.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      }
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          disabled={loading}
          type="submit"
        >
          Continue
        </Button>
      </div>
    </form>
  </Form>
  )
}
