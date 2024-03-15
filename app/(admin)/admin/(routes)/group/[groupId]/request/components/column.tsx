"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { Button } from "@/components/ui/button"

export type RequestGroupColumn = {
  id: string,
  groupId: string,
  name: string,
  type: string,
  createdAt: string,
  eventId?: string
}

export const columns: ColumnDef<RequestGroupColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => 
    <Button variant="link" onClick={() => {
      console.log(row.original.id);
      window.location.replace(`/admin/request-group/${row.original.id}`)
    }}>
      {row.original.name}
    </Button>
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
]
