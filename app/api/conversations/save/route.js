import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();
    const body = await request.json();
    const { sessionId, messages, title } = body;

    if (!sessionId || !messages || !Array.isArray(messages)) {
      return Response.json(
        { error: "Session ID and messages array are required" },
        { status: 400 },
      );
    }

    const userId = session?.user?.id || null;

    // Check if conversation exists
    const existingConversation = await sql`
      SELECT id FROM conversations WHERE session_id = ${sessionId}
    `;

    let conversationId;

    if (existingConversation.length > 0) {
      // Update existing conversation
      conversationId = existingConversation[0].id;

      await sql`
        UPDATE conversations 
        SET updated_at = NOW(),
            title = ${title || null},
            user_id = ${userId}
        WHERE id = ${conversationId}
      `;

      // Delete old messages for this conversation
      await sql`
        DELETE FROM messages WHERE conversation_id = ${conversationId}
      `;
    } else {
      // Create new conversation
      const newConversation = await sql`
        INSERT INTO conversations (user_id, session_id, title, created_at, updated_at)
        VALUES (${userId}, ${sessionId}, ${title || null}, NOW(), NOW())
        RETURNING id
      `;
      conversationId = newConversation[0].id;
    }

    // Insert all messages
    for (const message of messages) {
      await sql`
        INSERT INTO messages (conversation_id, role, content, is_gif, timestamp, created_at)
        VALUES (
          ${conversationId},
          ${message.role},
          ${message.content},
          ${message.isGif || false},
          ${message.timestamp},
          NOW()
        )
      `;
    }

    return Response.json({
      success: true,
      conversationId,
      messageCount: messages.length,
    });
  } catch (error) {
    console.error("Error saving conversation:", error);
    return Response.json(
      { error: "Failed to save conversation", details: error.message },
      { status: 500 },
    );
  }
}
