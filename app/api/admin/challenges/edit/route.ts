import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"
import { createClient } from "@/utils/supabase/server";

const testCaseSchema = z.object({
  input: z.string(),
  output: z.string(),
  is_sample: z.boolean(),
  id: z.string().optional()
});

const formSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  category: z.string().min(1),
  tags: z.string(),
  description: z.string().optional(),
  constraints: z.string().optional(),
  starterCode: z.string().optional(),
  isPublic: z.boolean(),
  timeLimit: z.number().min(1),
  memoryLimit: z.number().min(1),
  testCasesJson: z.string().refine((val) => {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) && parsed.every(tc =>
        typeof tc === "object" &&
        tc !== null &&
        "input" in tc &&
        "output" in tc &&
        "is_sample" in tc
      );
    } catch {
      return false;
    }
  })
});

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient()
        const body = await request.json()
        const parsedData = formSchema.parse(body)

        const testCases = JSON.parse(parsedData.testCasesJson)

        const { data: challenge, error: challengeError } = await supabase.from("challenges").update({
          title: parsedData.title,
          difficulty: parsedData.difficulty,
          category: parsedData.category,
          tags: parsedData.tags.split(",").map(tag => tag.trim()),
          description: parsedData.description,
          constraints: parsedData.constraints,
          starter_code: parsedData.starterCode,
          is_public: parsedData.isPublic,
          time_limit: parsedData.timeLimit,
          memory_limit: parsedData.memoryLimit
        }).eq("id", parsedData.id).select().single()

        if(challengeError) throw challengeError
        const testCasesToInsert = testCases.map((tc: z.infer<typeof testCaseSchema>) => ({
          challenge_id: challenge.id,
          input: tc.input,
          output: tc.output,
          is_sample: tc.is_sample,
          id: tc.id
        }))

        const { error: testCaseError } = await supabase.from("test_cases").upsert(testCasesToInsert)
        if(testCaseError) throw testCaseError

        return NextResponse.json({
          id: challenge.id
        })

    } catch (e) {
      console.log(e)
        return NextResponse.json({
          error: e as string
        })
    }
}