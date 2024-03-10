"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod" 
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { useGroupModal } from "@/hooks/use-group-modal";
import { Modal } from "@/components/ui/modal";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1),
});

export const GroupModal = () => {
  const groupModal = useGroupModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setLoading(true);

      const response = await axios.post('/api/group', values);
      
      window.location.assign(`/admin/group/${response.data.id}`)
      toast.success("Group created.")
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      title="Create a Group"
      description="Add a new group to manage events and ideas!"
      isOpen={groupModal.isOpen}
      onClose={groupModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
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
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button 
                  disabled={loading}
                  variant="outline"
                  onClick={groupModal.onClose}>
                  Cancel
                </Button>
                <Button
                  disabled={loading}
                  type="submit"
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}