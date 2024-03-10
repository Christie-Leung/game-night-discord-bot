"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import { Button } from "@/components/ui/button"

export type GroupColumn = {
  uuid: string
  name: string
  createdAt: string
}

export const columns: ColumnDef<GroupColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    id: "links",
    cell: ({ row }) => <Button variant="link" onClick={() => window.location.replace(`/admin/group/${row.original.uuid}`)}>
      {row.original.name}
    </Button>
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