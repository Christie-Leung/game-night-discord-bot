"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useParams, useRouter } from "next/navigation";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";


import { GroupColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modal/alert-modal";

interface CellActionProps {
  data: GroupColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {

  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(`/invite/group/id`);
    toast.success("Group ID copied to the clipbaord.")
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/group/${data.uuid}`);
      router.refresh();
      toast.success("Group successfully deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return ( 
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            Actions
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.uuid)}>
            <Copy className="mr-2 h-4 w-4"/>
            Invite Members
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4"/>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
   );
}
 