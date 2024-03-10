import { format } from "date-fns";
import { createClient } from "@/utils/supabase/client";
import { RequestClient } from "./components/client";
import { RequestGroupColumn } from "./components/column";

const RequestsPage = async ({ params }: {
    params: { groupId: string }
}) => {
    const supabase = createClient();


  const { data: group, error } = await supabase.from('RequestGroup')
  .select("*")
  .eq("groupId", params.groupId);


  let formattedGroups: RequestGroupColumn[] = []
  
  if (group) {
    formattedGroups = group.map((item) => ({
      id: item.id,
      groupId: item.groupId,
      name: item.name,
      type: item.type,
      createdAt: format(item.created_at, "MMMM do, yyyy"),
    }));
}

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <RequestClient data={formattedGroups} />
      </div>
    </div>
  )
}

export default RequestsPage;
