import { User } from "@supabase/supabase-js"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
    user: User | null,
    isAuthenticated: boolean
    isAdmin?: boolean
    setUser: (user: User | null, isAdmin: boolean) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isAdmin: false,
            setUser: (user, isAdmin) => set({
                user, isAuthenticated: !!user, isAdmin
            })
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user ?? null,
                isAuthenticated: state.isAuthenticated,
                isAdmin: state.isAdmin
            })
        }
    )
)