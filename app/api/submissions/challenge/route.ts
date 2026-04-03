import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)

    const challengeId = searchParams.get("challenge_id")

    if(!challengeId) {
        return NextResponse.json({
            error: "challenge_id is required"
        }, {
            status: 400
        })
    }

    const supabase = await createClient()

    const { data, error } = await supabase.from("submissions").select("id, user_id, created_at, total_tests, passed_tests, overall_status").eq("challenge_id", challengeId)

    if(error) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        })
    }
    
    return NextResponse.json(data)
}