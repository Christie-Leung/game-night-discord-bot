import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/client";

export async function POST(
  req: Request,
) {
  try {
    const supabase = createClient();
    const body = await req.json();

    const { name, description, groupId, eventDate, location } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    const {data: event, error} = await supabase.from('Event').insert({
        name: name,
        description: description,
        groupId: groupId,
        event_date: eventDate,
        location: location,
    }).select("uuid");

    if (error) {
      console.log('[EVENTS_POST]', error);
      return new NextResponse("Internal error", { status: 500 })
    }
    return NextResponse.json(event[0].uuid);
  } catch (error) {
    console.log('[EVENTS_POST]', error);
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(
  req: Request,
) {
  try {
    const supabase = createClient();

    const {data: event, error} = await supabase.from('Event').select("*");

    if (error) {
      console.log('[EVENTS_GET]', error);
      return new NextResponse("Internal error", { status: 500 })
    }
    return NextResponse.json(event);
  } catch (error) {
    console.log('[EVENTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 })
  }
}