import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/client";

export async function DELETE(
  req: Request,
  { params } : { params: { eventId: string }}
) {
  try {
    const supabase = createClient();

    const {data: event, error} = await supabase.from('Event')
    .delete()
    .eq("uuid", params.eventId);

    if (error) {
      console.log('[EVENT_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 })
    }

    return NextResponse.json(event);
  } catch (error) {
    console.log('[EVENT_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params } : { params: { eventId: string }}
) {
  try {
    const supabase = createClient();

    const {data: event, error} = await supabase.from('Event')
    .select("*")
    .eq("uuid", params.eventId);

    if (error) {
      console.log('[EVENT_GET]', error);
      return new NextResponse("Internal error", { status: 500 })
    }

    return NextResponse.json(event);
  } catch (error) {
    console.log('[EVENT_GET]', error);
    return new NextResponse("Internal error", { status: 500 })
  }
}