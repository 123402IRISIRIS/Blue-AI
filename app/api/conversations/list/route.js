import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET(request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      // Return empty list for non-authenticated users
      return Response.json({ conversations: [] });
    }

    // Get all conversations for this user
    const conversations = await sql`
      SELECT 
        c.id,
        c.session_id as "sessionId",
        c.title,
        c.created_at as "createdAt",
        c.updated_at as "updatedAt",
        COUNT(m.id) as "messageCount"
      FROM conversations c
      LEFT JOIN messages m ON m.conversation_id = c.id
      WHERE c.user_id = ${userId}
      GROUP BY c.id, c.session_id, c.title, c.created_at, c.updated_at
      ORDER BY c.updated_at DESC
      LIMIT 50
    `;

    return Response.json({
      conversations: conversations.map((conv) => ({
        id: conv.id,
        sessionId: conv.sessionId,
        title: conv.title || "Untitled Conversation",
        createdAt: conv.createdAt,
        updatedAt: conv.updatedAt,
        messageCount: parseInt(conv.messageCount),
      })),
    });
  } catch (error) {
    console.error("Error listing conversations:", error);
    return Response.json(
      { error: "Failed to list conversations", details: error.message },
      { status: 500 },
    );
  }
}
