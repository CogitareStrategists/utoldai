import { sql } from "../../../../lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const organization = String(body.organization || "").trim();

    if (!name || !email) {
      return Response.json(
        { success: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO experience_entries (name, email, organization)
      VALUES (${name}, ${email}, ${organization || null})
      RETURNING id, name, email, organization, created_at
    `;

    return Response.json({
      success: true,
      entry: result[0],
    });
  } catch (error) {
    console.error("Experience entry create error:", error);

    return Response.json(
      { success: false, error: "Failed to save experience entry." },
      { status: 500 }
    );
  }
}