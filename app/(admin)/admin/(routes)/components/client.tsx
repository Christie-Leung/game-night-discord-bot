"use client"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { GroupColumn, columns } from "./columns"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { useGroupModal } from "@/hooks/use-group-modal"

interface GroupClientProps {
  data: GroupColumn[]
}

export const GroupClient: React.FC<GroupClientProps> = ({
  data,
}) => {
  const groupModal = useGroupModal();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title={`Your Groups`}
          description="Manage your groups"
        />
        <Button onClick={() => groupModal.onOpen()}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  )
}