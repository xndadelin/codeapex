import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { UUID } from "crypto";

interface Challenge_Line {
    id: UUID,
    title: string,
    difficulty: string,
    category: string,
    tags: string[],
    is_public: boolean
    acceptance: number
    submissions: number
}

interface TestCase {
    id: UUID,
    challenge_id: UUID,
    input: string,
    output: string,
    is_sample: boolean
}

interface Challenge {
    id: UUID,
    title: string,
    difficulty: string,
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
    acceptance: number,
    submissions: number,
    test_cases?: TestCase[]
}

interface PaginatedChallenges {
    challenges: Challenge_Line[],
    count: number
}

export const challengeKeys = {
    all: ["challenges"] as const,
    lists: () => [...challengeKeys.all, "lists"] as const,
    list: (filters?: { is_public?: boolean }) => [...challengeKeys.lists(), filters ?? {}] as const,
    listLine: (scope: "public" | "admin") => [...challengeKeys.all, "list-line", scope] as const,
    details: () => [...challengeKeys.all, "details"] as const,
    detail: (id: UUID) => [...challengeKeys.details(), id] as const,
    paginated: (page: number, pageSize: number, scope?: "public" | "admin", searchQuery?: string | "") => 
        [...challengeKeys.all, "paginated", { page, pageSize, scope, searchQuery}] as const 
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

export function useChallengeAdmin(id: UUID) {
    return useQuery<Challenge>({
        queryKey: challengeKeys.detail(id),
        queryFn: async() => {
            const supabase = createClient()
            const { data, error } = await supabase.from("challenges").select("*").eq("id", id).single()
            const { data: testCases, error: testCasesError } = await supabase.from("test_cases").select("*").eq("challenge_id", id)

            if(error || testCasesError) throw error
            return {
                ...data as Challenge,
                test_cases: testCases
            }
        }
    })
}

export function usePublicChallenges() {
    return useQuery<Challenge[]>({
        queryKey: challengeKeys.list({ is_public: true }),
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
        queryKey: challengeKeys.listLine("public"),
        queryFn: async() => {
            const supabase = createClient()
            const { data, error } = await supabase.from("challenges").select("id, title, difficulty,category, tags, is_public, acceptance, submissions").eq("is_public", true)

            if(error) throw error
            return data as Challenge_Line[]
        }
    })
}

export function useListAdminChallenges() {
    return useQuery<Challenge_Line[]>({
        queryKey: challengeKeys.listLine("admin"),
        queryFn: async() => {
            const supabase = createClient()
            const { data, error } = await supabase.from("challenges").select("id, title, difficulty,category, tags, is_public, acceptance, submissions")

            if(error) throw error
            return data as Challenge_Line[]
        }
    })
}

export function usePaginatedChallenges(page: number, pageSize: number, scope: "public" | "admin" = "public", searchQuery?: string | "") {
    return useQuery<PaginatedChallenges>({
        queryKey: challengeKeys.paginated(page, pageSize, scope, searchQuery),
        queryFn: async() => {
            const supabase = createClient()

            const from = page * pageSize
            const to = from + pageSize - 1

            let query = supabase.from("challenges").select("id, title, difficulty,category, tags, is_public, acceptance, submissions", {
                count: "exact"
            }).range(from, to)

            if(scope === "public") {
                query = query.eq("is_public", true)
            }

            if(searchQuery && searchQuery.trim() !== "") {
                query = query.ilike("title", `%${searchQuery.trim()}%`)
            }

            const { data, error, count } = await
                query
        
            if(error) throw error
            return {
                challenges: (data ?? []) as Challenge_Line[],
                count: count ?? 0
            }
        }
    })
}