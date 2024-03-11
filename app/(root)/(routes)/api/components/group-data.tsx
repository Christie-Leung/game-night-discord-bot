import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function GroupDataDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Group Data Type</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Group Data Type</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="uuid" className="text-right">
              uuid:
            </Label>
            <Input id="uuid" value="uuid" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="created_at" className="text-right">
              created_at
            </Label>
            <Input id="created_at" value="timestamptz" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              name:
            </Label>
            <Input id="name" value="text" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="adminId" className="text-right">
              adminId:
            </Label>
            <Input id="adminId" value="text" className="col-span-3" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
