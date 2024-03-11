import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/client";

export async function DELETE(
  req: Request,
  { params } : { params : { groupId: string }}
) {
  try {
    const supabase = createClient();

    console.log(params);
    const {data: event, error} = await supabase.from('Group')
    .delete()
    .eq("uuid", params.groupId);

    if (error) {
      console.log('[GROUP_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 })
    }
    
    return NextResponse.json(event);
  } catch (error) {
    console.log('[GROUP_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params } : { params : { groupId: string }}
) {
  try {
    const supabase = createClient();

    const {data: event, error} = await supabase.from('Group')
    .select('*')
    .eq("uuid", params.groupId);

    if (error) {
      console.log('[GROUP_GET]', error);
      return new NextResponse("Internal error", { status: 500 })
    }
    
    return NextResponse.json(event);
  } catch (error) {
    console.log('[GROUP_GET]', error);
    return new NextResponse("Internal error", { status: 500 })
  }
}
