import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/client";

export async function POST(
  req: Request,
) {
  try {
    const supabase = createClient();
    const { userId } = auth();
    const body = await req.json();

    const { name, description, requestGroupId } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }
    if (!description) {
        return new NextResponse("Description is required", { status: 400 })
    }
    if (!requestGroupId) {
        return new NextResponse("Request Group Id is required", { status: 400 })
    }

    const request = await supabase.from('Request').insert({
        name: name,
        description: description,
        requestGroupId: requestGroupId,
        userId: userId,
    })

    return NextResponse.json(request);
  } catch (error) {
    console.log('[REQUEST_POST]', error);
    return new NextResponse("Internal error", { status: 500 })
  }
}