import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return Response.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { conversationId } = body;

    if (!conversationId) {
      return Response.json(
        { error: "Conversation ID is required" },
        { status: 400 },
      );
    }

    // Delete conversation (messages will be cascade deleted)
    const result = await sql`
      DELETE FROM conversations 
      WHERE id = ${conversationId} AND user_id = ${userId}
      RETURNING id
    `;

    if (result.length === 0) {
      return Response.json(
        { error: "Conversation not found or unauthorized" },
        { status: 404 },
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    return Response.json(
      { error: "Failed to delete conversation", details: error.message },
      { status: 500 },
    );
  }
}
