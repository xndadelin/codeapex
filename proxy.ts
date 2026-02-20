import { NextResponse, NextRequest } from "next/server";
import { createClient } from "./utils/supabase/server";


export async function proxy(request: NextRequest) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser()
    const user_id = data?.user?.id

    if(!user_id) {
        return NextResponse.json({
            error: "Hey! You need to be logged in to use this API."
        }, { status: 401 })
    }

    const { data: user } = await supabase.from("admins").select("id").eq("user_id", user_id).single()

    if(!user) {
        return NextResponse.json({
            error: "Hey! You need to be an admin to use this API route!"
        }, { status: 403 })
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/api/admin/:path*"
    ]
}