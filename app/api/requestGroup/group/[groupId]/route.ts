import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/client";

export async function POST(
  req: Request,
  { params } : { params: { groupId: string }}
) {
  try {
    const supabase = createClient();
    const body = await req.json();

    const { name, type } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    const request = await supabase.from('RequestGroup').insert({
        name: name,
        type: type,
        groupId: params.groupId,
    }).select("id")

    return NextResponse.json(request);
  } catch (error) {
    console.log('[REQUESTGROUP_POST]', error);
    return new NextResponse("Internal error", { status: 500 })
  }
}
