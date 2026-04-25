import { inngest } from "@/inngest/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { userInput } = await request.json();
    
    const resultIds = await inngest.send({
        name: "aiCareerAgent",
        data: {
            userInput
        }
    }) as any;

    const runId = resultIds[0].id;

}

async function getRunState(runId: string) {
    const result = await axios.get(
        `https://api.inngest.com/v1/functions/aiCareerAgent/runs/${runId}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
            },
        }
    )
}