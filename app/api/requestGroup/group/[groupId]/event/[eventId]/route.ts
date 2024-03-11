import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/client";

export async function POST(
  req: Request,
  { params } : { params: { groupId: string, eventId: string }}
) {
  try {
    const supabase = createClient();
    const body = await req.json();

    const { name, type } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    const { data, error} = await supabase.from('RequestGroup').insert({
        name: name,
        type: type,
        groupId: params.groupId,
        eventId: params.eventId,
    }).select("id")

    if (error) {
      console.log('[REQUESTGROUP_EVENTID_POST]', error);
      return new NextResponse("Internal error", { status: 500 })
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log('[REQUESTGROUP_EVENTID_POST]', error);
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params } : { params: { groupId: string, eventId: string }}
) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from('RequestGroup')
      .select("*")
      .eq("groupId", params.groupId)
      .eq("eventId", params.eventId);

    if (error) {
      console.log('[REQUESTGROUP_EVENTID_GET]', error);
    return new NextResponse("Internal error", { status: 500 })
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log('[REQUESTGROUP_EVENTID_GET]', error);
    return new NextResponse("Internal error", { status: 500 })
  }
}