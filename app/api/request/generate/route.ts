import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/client";

export async function GET(
  req: Request
) {
  try {
    const supabase = createClient();
    const body = await req.json();

    const { count, requestGroupId } = body;

    const {data: event, error} = await supabase.from('Request')
    .select('*')
    .order('RANDOM()')
    .eq("requestGroupId", requestGroupId)
    .limit(count);

    if (error) {
      console.log('[REQUEST_GENERATE_GET]', error);
      return new NextResponse("Internal error", { status: 500 })
    }
    
    return NextResponse.json(event);
  } catch (error) {
    console.log('[REQUEST_GENERATE_GET]', error);
    return new NextResponse("Internal error", { status: 500 })
  }
}

