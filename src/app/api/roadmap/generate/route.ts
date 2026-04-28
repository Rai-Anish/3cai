import { inngest } from "@/inngest/client";
import { auth } from "@/lib/auth";
import { getTokenBalance } from "@/services/tokens/token-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  const userId = session?.user?.id
  const userEmail = session?.user?.email

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { userInput, roadmapId, model  } = await req.json();

  // check token amount
  const balance = await getTokenBalance(session.user.id);
  if (!balance || balance.subscriptionBalance < 1) {
    return NextResponse.json({ message: "Insufficient tokens" }, { status: 402 });
  }

  // trigger inngest background function

  const { ids } = await inngest.send({
    name: 'roadmap/generate.requested',
    data: {
      userId,
      userEmail,
      userInput,
      roadmapId,
      model: model || 'gemini'  
    }
  });

  return NextResponse.json({
    message: "Your roadmap is being generated",
    runId: ids[0]
  });
}