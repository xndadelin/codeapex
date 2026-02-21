"use client"

import { useAuthStore } from "@/hooks/useAuthStore"
import { createClient } from "@/utils/supabase/client"
import { useEffect } from "react"

export function AuthProvider({
    children
}: {
    children: React.ReactNode
}) {
    const { setUser } = useAuthStore()

    useEffect(() => {
        const supabase = createClient()

        const handleUser = async (user: any) => {
            if (!user) {
                setUser(null, false)
                return
            }

            const { data } = await supabase
                .from("admins")
                .select("id")
                .eq("user_id", user.id)
                .maybeSingle()

            setUser(user, !!data)
        }

        supabase.auth.getSession().then(({ data }) => {
            handleUser(data.session?.user ?? null)
        })

        const { data: { subscription } } =
            supabase.auth.onAuthStateChange((_event, session) => {
                handleUser(session?.user ?? null)
            })

        return () => {
            subscription.unsubscribe()
        }
    }, [setUser])

    return <>{children}</>
}