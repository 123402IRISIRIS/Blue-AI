import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return Response.json(
        { error: "Session ID is required" },
        { status: 400 },
      );
    }

    // Get conversation
    const conversations = await sql`
      SELECT id, title, created_at, updated_at 
      FROM conversations 
      WHERE session_id = ${sessionId}
    `;

    if (conversations.length === 0) {
      return Response.json({ messages: [], conversation: null });
    }

    const conversation = conversations[0];

    // Get messages for this conversation
    const messages = await sql`
      SELECT role, content, is_gif as "isGif", timestamp
      FROM messages
      WHERE conversation_id = ${conversation.id}
      ORDER BY timestamp ASC
    `;

    return Response.json({
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
        isGif: msg.isGif,
        timestamp: msg.timestamp,
      })),
      conversation: {
        id: conversation.id,
        title: conversation.title,
        createdAt: conversation.created_at,
        updatedAt: conversation.updated_at,
      },
    });
  } catch (error) {
    console.error("Error loading conversation:", error);
    return Response.json(
      { error: "Failed to load conversation", details: error.message },
      { status: 500 },
    );
  }
}
