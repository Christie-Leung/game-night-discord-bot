"use client"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { RequestGroupColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { useParams } from "next/navigation"

interface GroupClientProps {
  data: RequestGroupColumn[]
}

export const RequestClient: React.FC<GroupClientProps> = ({
  data,
}) => {
  const params = useParams();
  const url = params?.eventId ? `/admin/group/${params.groupId}/event/${params.eventId}/request/new`
  : `/admin/group/${params.groupId}/request/new`

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title={`Your Request Groups`}
          description="Manage your Request Groups"
        />
        <Button onClick={() => window.location.replace(url)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  )
}