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

export const IdeaForm = ({ inviteId, id }: {
  inviteId: string,
  id: string | null,
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
        try {
          await axios.post('/api/request', {
              name: values.name,
              description: values.description,
              requestGroupId: inviteId,
          });
          let success = "Submitted!"
          if (id) success += " Hope to see you there!"
          toast.success(success);
          if (id) window.location.replace(`/event/${id}`);
          else window.location.replace(`/thankyou`);
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong. Please try submitting again.");
        } finally {
          setLoading(false);
        }
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Some name..." {...field} />
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
                <Textarea placeholder="Maybe describe the thing a bit... even a link would be helpful :>" {...field} />
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
