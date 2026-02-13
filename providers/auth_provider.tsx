"use client"

import { useAuthStore } from "@/hooks/useAuthStore"
import { createClient } from "@/utils/supabase/client"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { authKeys } from "@/hooks/use-auth"


export function AuthProvider({
    children
}: {
    children: React.ReactNode
}) {
    const { setUser } = useAuthStore()
    const queryClient = useQueryClient()

    useEffect(() => {
        const supabase = createClient()
        supabase.auth.getSession().then(({
            data: { session }
        }) => {
            setUser(session?.user ?? null)
        })

        const {
            data: {
                subscription
            },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            queryClient.invalidateQueries({
                queryKey: authKeys.all
            })
        })

        return () => subscription.unsubscribe()
        
    }, [setUser, queryClient])

    return <>{children}</>
}