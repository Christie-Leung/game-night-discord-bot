import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/client";

export async function POST(
  request: Request,
  { params } : { params: { groupId: string }}
) {
  try {
    const supabase = createClient();
    const body = await request.json();

    const { name, type } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    const { data, error } = await supabase.from('RequestGroup').insert({
        name: name,
        type: type,
        groupId: params.groupId,
    }).select("id");

    if (error) {
      console.log('[REQUESTGROUP_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
    }

    return NextResponse.json(data[0].id);
  } catch (error) {
    console.log('[REQUESTGROUP_POST]', error);
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(
  request: Request,
  { params } : { params: { groupId: string }}
) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from('RequestGroup')
      .select("*")
      .eq("id", params.groupId);

    if (error) {
      console.log('[REQUESTGROUP_GROUPID_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log('[REQUESTGROUP_GROUPID_GET]', error);
    return new NextResponse("Internal error", { status: 500 })
  }
}
