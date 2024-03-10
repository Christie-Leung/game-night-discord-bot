import { format } from "date-fns";
import { createClient } from "@/utils/supabase/client";
import { auth } from "@clerk/nextjs";
import { GroupColumn } from "./components/columns";
import { GroupClient } from "./components/client";

export type Group = {
  uuid: string
  createdAt: string
  name: string
  adminId: string
}
const GroupsPage = async () => {
    const supabase = createClient();
    const { userId } = auth();


  const { data: group, error } = await supabase.from('Group')
  .select("*")
  .eq("adminId", userId);


  let formattedGroups: GroupColumn[] = []
  
  if (group) {
    formattedGroups = group.map((item) => ({
      uuid: item.uuid,
      name: item.name,
      createdAt: format(item.created_at, "MMMM do, yyyy"),
    }));
}

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <GroupClient data={formattedGroups} />
      </div>
    </div>
  )
}

export default GroupsPage;