import { sql } from "../../../../lib/db";

function clean(value: unknown, maxLength = 500) {
  return String(value ?? "").trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const doctorName = clean(body.doctorName, 150);
    const email = clean(body.email, 254).toLowerCase();
    const mobile = clean(body.mobile, 30);
    const clinicName = clean(body.clinicName, 200);
    const specialty = clean(body.specialty, 150);
    const city = clean(body.city, 120);
    const budget = clean(body.budget, 100);
    const preferredContactMethod = clean(body.preferredContactMethod, 50);
    const message = clean(body.message, 2000);
    const utmSource = clean(body.utmSource, 150);
    const utmMedium = clean(body.utmMedium, 150);
    const utmCampaign = clean(body.utmCampaign, 200);
    const gclid = clean(body.gclid, 300);

    if (!doctorName || !email || !mobile) {
      return Response.json(
        { success: false, error: "Doctor name, email and mobile number are required." },
        { status: 400 }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return Response.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO doctor_leads (
        doctor_name,
        email,
        mobile,
        clinic_name,
        specialty,
        city,
        budget,
        preferred_contact_method,
        message,
        utm_source,
        utm_medium,
        utm_campaign,
        gclid
      )
      VALUES (
        ${doctorName},
        ${email},
        ${mobile},
        ${clinicName || null},
        ${specialty || null},
        ${city || null},
        ${budget || null},
        ${preferredContactMethod || null},
        ${message || null},
        ${utmSource || null},
        ${utmMedium || null},
        ${utmCampaign || null},
        ${gclid || null}
      )
      RETURNING id, created_at
    `;

    return Response.json({ success: true, lead: result[0] });
  } catch (error) {
    console.error("Doctor lead create error:", error);
    return Response.json(
      { success: false, error: "We could not save your request. Please try again." },
      { status: 500 }
    );
  }
}
