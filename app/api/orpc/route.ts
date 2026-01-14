import { router } from "@/lib/orpc/router";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { procedure, input } = body;

    // Get the procedure handler from router
    const handler = (router as any)[procedure];

    if (!handler) {
      return NextResponse.json(
        { error: "Procedure not found" },
        { status: 404 }
      );
    }

    // Validate input if schema exists
    if (handler.input && input !== undefined) {
      handler.input.parse(input);
    }

    // Call the handler
    const result = await handler.handler(input);

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Use POST for oRPC calls" });
}
