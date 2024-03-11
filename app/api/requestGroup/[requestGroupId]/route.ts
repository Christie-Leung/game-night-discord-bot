import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/client";

export async function DELETE(
  req: Request,
  { params } : { params: { requestGroupId: string }}
) {
  try {
    const supabase = createClient();
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }


    const {data: event, error} = await supabase.from('RequestGroup')
    .delete()
    .eq("id", params.requestGroupId);

    if (error) {
      console.log('[REQUESTGROUP_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 })
    }
    
    return NextResponse.json(event);
  } catch (error) {
    console.log('[REQUESTGROUP_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params } : { params: { requestGroupId: string }}
) {
  try {
    const supabase = createClient();

    const {data: event, error} = await supabase.from('RequestGroup')
    .select('*')
    .eq("id", params.requestGroupId);

    if (error) {
      console.log('[REQUESTGROUPS_GET]', error);
      return new NextResponse("Internal error", { status: 500 })
    }
    
    return NextResponse.json(event);
  } catch (error) {
    console.log('[REQUESTGROUPS_GET]', error);
    return new NextResponse("Internal error", { status: 500 })
  }
}

