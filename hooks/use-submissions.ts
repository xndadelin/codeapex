import { useQuery } from "@tanstack/react-query";

interface SubmissionLine {
    id: string,
    user_id: string,
    challenge_id: string, 
    status_id: string,
    created_at: Date,
    total_tests: number,
    passed_tests: number
    overall_status: string
}



export const submissionKeys = {
    all: ["submissions"] as const,
    list: (challengeId: string) => [...submissionKeys.all, "list", challengeId] as const,
    details: () => [...submissionKeys.all, "details"] as const,
    detail: (id: string) => [...submissionKeys.details(), id] as const,

}

export function useSubmissionResultsLines(challengeId: string) {
    return useQuery<SubmissionLine[]>({
        queryKey: submissionKeys.list(challengeId),
        queryFn: async () => {
            const response = await fetch(`/api/submissions/challenge?challenge_id=${challengeId}`);
            if (!response.ok) {
                throw new Error("oops! failed to fetch submissions")
            }
            const data = await response.json();
            return data as SubmissionLine[]
        }
    })
}