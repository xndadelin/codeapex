'use client'

import Loading from "@/app/loading";
import { useChallenge } from "@/hooks/use-challenges";
import { UUID } from "crypto";
import { useParams } from "next/navigation";

export default function ChallengePage() {
    const { id } = useParams()
    const { data: challenge, isLoading } = useChallenge(id as UUID)

    if(isLoading) {
        return <Loading />
    }

    return (
        <p>
            {challenge?.title}
        </p>
    )
}