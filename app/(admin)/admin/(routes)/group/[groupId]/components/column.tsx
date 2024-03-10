"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { Button } from "@/components/ui/button"

export type EventColumn = {
  uuid: string,
  groupId: string,
  name: string,
  description: string,
  eventDate: string,
  location: string,
}

export const columns: ColumnDef<EventColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => 
    <Button variant="link" onClick={() => 
    window.location.replace(`/admin/group/${row.original.groupId}/event/${row.original.uuid}`)}>
      {row.original.name}
    </Button>
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "eventDate",
    header: "Event Date",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
]