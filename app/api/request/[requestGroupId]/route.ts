import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    params: { requestGroupId: string }
  ) {
    try {
  
      const supabase = createClient();
      console.log("search", params.requestGroupId);
  
      const { data, error } = await supabase.from('Request')
        .select('*')
        .eq("requestGroupId", params.requestGroupId);
  
      if (error) {
        console.log('[REQUESTS_GET]', error);
        return new NextResponse("Internal error", { status: 500 })
      }
  
      return NextResponse.json(data);
    } catch (error) {
      console.log('[REQUESTS_GET]', error);
      return new NextResponse("Internal error", { status: 500 })
    }
  }