import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuthStore } from "./useAuthStore"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { Provider } from "@supabase/supabase-js"

// not sure exactly why signup does not work (the signup confirmation email does not go through, will come back after nest is up and i have my precius mail back)

interface SignupCredentials {
    username: string
    email: string
    password: string
}

interface LoginCredentials {
    email: string
    password: string
}

export const authKeys = {
    all: ["auth"] as const,
    user: () => [...authKeys.all, "user"] as const,
    session: () => [...authKeys.all, "session"] as const
}

export function useUser() {
    const { setUser } = useAuthStore()
    const router = useRouter()

    return useQuery({
        queryKey: authKeys.user(),
        queryFn: async() => {
            const supabase = createClient()
            const { data: { user }, error } = await supabase.auth.getUser()

            if(error) throw error
            setUser(user)
            return user
        },
        staleTime: 5 * 60 * 1000,
        retry: false
    })
}

export function useSignup() {
    const queryClient = useQueryClient()
    const { setUser } = useAuthStore()
    const router = useRouter()

    return useMutation({
        mutationFn: async(credentials: SignupCredentials) => {
            const supabase = createClient()
            const { data, error } = await supabase.auth.signUp({
                email: credentials.email,
                password: credentials.password
            })
            if(error) throw error
            if(!data.user) throw new Error("Signup failed!")

            return data
        },
        onSuccess: (data) => {
            console.log(data)
            setUser(data.user)
            queryClient.invalidateQueries({
                queryKey: authKeys.all
            })
        }
    })
}

export function useLogin() {
    const queryClient = useQueryClient()
    const { setUser } = useAuthStore()
    const router = useRouter()

    return useMutation({
        mutationFn: async(credentials: LoginCredentials) => {
            const supabase = createClient()

            const { data, error } = await supabase.auth.signInWithPassword({
                email: credentials.email,
                password: credentials.password
            })

            if(error) throw error
            return data
        },
        onSuccess: (data) => {
            setUser(data.user)
            queryClient.invalidateQueries({
                queryKey: authKeys.all
            })
            router.push("/")
        }
    })
}

export function useOAuthLogin() {
    return useMutation({
        mutationFn: async(provider: Provider) => {
            const supabase = createClient()

            const { data, error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    queryParams: {
                        access_type: "offline",
                        prompt: "consent"
                    }
                }
            })
        
            if(error) throw error
            return data
        },
    })
}
