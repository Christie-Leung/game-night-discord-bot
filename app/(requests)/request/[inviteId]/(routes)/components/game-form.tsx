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
import { Textarea } from "@/components/ui/textarea"
import toast from "react-hot-toast"
import { redirect } from "next/navigation"
import axios from "axios"
import { useState } from "react"

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(5),
});

export const GameForm = ({ inviteId }: {
  inviteId: string
}) => {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          description: "",
        },
      })
      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        console.log(values)
        try {
          await axios.post('/api/request', {
              name: values.name,
              description: values.description,
              requestGroupId: inviteId,
          });
          toast.success("Submitted! See you on Game Night!");
          redirect("/");
        } catch (error) {
          toast.error("Something went wrong. Please try submitting again.");
        } finally {
          setLoading(false);
        }
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game Name</FormLabel>
              <FormControl>
                <Input placeholder="Some game name..." {...field} />
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
              <FormLabel>Description + Instructions</FormLabel>
              <FormControl>
                <Textarea placeholder="How does the game work? What are the rules and instructions? You can put a link here too." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>Submit</Button>
      </form>
    </Form>
  )
}
