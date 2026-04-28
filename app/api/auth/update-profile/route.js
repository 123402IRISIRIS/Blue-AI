import sql from "@/app/api/utils/sql";
import { hash } from "argon2";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    // Get the current user's session
    const session = await auth();

    if (!session || !session.user) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { name, password } = body;

    // Build update query dynamically
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (name !== undefined && name.trim()) {
      updates.push(`name = $${paramCount}`);
      values.push(name.trim());
      paramCount++;
    }

    if (password && password.trim()) {
      const hashedPassword = await hash(password);
      // Update the password in the auth_accounts table
      await sql(
        `UPDATE auth_accounts SET password = $1 WHERE "providerAccountId" = $2 AND provider = 'credentials'`,
        [hashedPassword, userId],
      );
    }

    if (updates.length === 0) {
      if (!password) {
        return Response.json({ error: "No fields to update" }, { status: 400 });
      }
      return Response.json({
        message: "Profile updated successfully",
        user: session.user,
      });
    }

    // Add user ID as the last parameter
    values.push(userId);

    const query = `
      UPDATE auth_users 
      SET ${updates.join(", ")}
      WHERE id = $${paramCount}
      RETURNING id, email, name
    `;

    const result = await sql(query, values);

    if (result.length === 0) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({
      message: "Profile updated successfully",
      user: result[0],
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return Response.json(
      { error: "Failed to update profile", details: error.message },
      { status: 500 },
    );
  }
}
