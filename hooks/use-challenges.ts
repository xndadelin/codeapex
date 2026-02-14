import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { UUID } from "crypto";

interface Challenge_Line {
    id: UUID,
    title: string,
    difficulty: string,
    difficulty_points: number,
    category: string,
    tags: string[],
    is_public: boolean
    acceptance: number
}

interface Challenge {
    id: UUID,
    title: string,
    difficulty: string,
    difficulty_points: number,
    category: string,
    tags: string[],
    description: string,
    constraints: string,
    starter_code: string,
    solution_code: string,
    is_public: boolean,
    time_limit: number,
    memory_limit: number,
    created_at: Date,
    updated_at: Date
}

export const challengeKeys = {
    all: ["challenges"] as const,
    list: () => [...challengeKeys.all, "list"] as const,
    detail: (id: UUID) => [...challengeKeys.all, "details", id] as const
}

export function useChallenges() {
    return useQuery<Challenge[]>({
        queryKey: challengeKeys.list(),
        queryFn: async() => {
            const supabase = createClient()
            const { data, error } = await supabase.from("challenges").select("*")

            if(error) throw error
            return data as Challenge[]
        },
        staleTime: 5 * 60 * 1000,
    })
}

export function useChallenge(id: UUID) {
    return useQuery<Challenge>({
        queryKey: challengeKeys.detail(id),
        queryFn: async() => {
            const supabase = createClient()
            const { data, error } = await supabase.from("challenges").select("*").eq("id", id).single()

            if(error) throw error
            return data as Challenge
        }
    })
}

export function usePublicChallenges() {
    return useQuery<Challenge[]>({
        queryKey: challengeKeys.list(),
        queryFn: async() => {
            const supabase = createClient()
            const { data, error } = await supabase.from("challenges").select("*").eq("is_public", true)

            if(error) throw error
            return data as Challenge[]
        }
    })
}

export function useListChallenges() {
    return useQuery<Challenge_Line[]>({
        queryKey: challengeKeys.list(),
        queryFn: async() => {
            const supabase = createClient()
            const { data, error } = await supabase.from("challenges").select("id, title, difficulty, difficulty_points, category, tags, is_public")

            if(error) throw error
            return data as Challenge_Line[]
        }
    })
}

