import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

const languageMap: Record<string, number> = {
  "Python 3": 71,
  "C/C++": 54,
};

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }} = await supabase.auth.getUser();

    if(!user) {
      return NextResponse.json({
        error: "Unauthorized. You must be logged in to submit code!"
      }, {
        status: 401
      })
    }

    const { code, language, challengeId } = await request.json();

    if (!code || !language || !languageMap[language] || !challengeId) {
      return NextResponse.json(
        {
          error: "Invalid input",
        },
        {
          status: 400,
        },
      );
    }

    const language_id = languageMap[language];
    const { data: testCases, error } = await supabase
      .from("test_cases")
      .select("input,output")
      .eq("challenge_id", challengeId);

    if (error || !testCases || testCases.length === 0) {
      return NextResponse.json(
        {
          error: "No test cases found",
        },
        {
          status: 404,
        },
      );
    }

    const runTest = async (input: string) => {
      const res = await fetch(
        "https://ce.judge0.com/submissions/?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source_code: code,
            language_id: language_id,
            stdin: input,
          }),
        },
      );

      return res.json();
    };

    const results = await Promise.all(
      testCases.map(async (tc: { input: string; output: string }) => {
        const data = await runTest(tc.input);
        return {
          input: tc.input,
          status: data.status?.description,
          output: data.stdout || data.stderr,
          accepted: data.stdout?.trim() === tc.output.trim(),
          time: data.time,
          memory: data.memory,
        };
      }),
    );

    if(!results) {
      return NextResponse.json({
        error: "Failed to run tests"
      }, {
        status: 500
      })
    }

    const { error: submissionError } = await supabase.from("submissions").insert({
      user_id: user.id,
      challenge_id: challengeId,
      source_code: code,
      language_name: language,
      total_tests: testCases.length,
      passed_tests: results.filter(r => r.accepted).length,
      test_results: results,
      max_time: Math.max(...results.map(r => r.time || 0)),
      max_memory: Math.max(...results.map(r => r.memory || 0))
    }) 

    if(submissionError) {
      return NextResponse.json({
        error: "Failed to save submission"
      }, {
        status: 500
      })
    }
 
    return NextResponse.json({
      results,
    });


  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: "this is sad. something went wrong",
    });
  }
}
