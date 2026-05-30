import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json({ success: true });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, service, assetType, message, contactMethod } =
      parsed.data;

    // Log submission (replace with Resend / Nodemailer in production)
    console.log("New valuation enquiry:", {
      name,
      email,
      phone,
      service,
      assetType,
      message,
      contactMethod,
      timestamp: new Date().toISOString(),
    });

    // TODO: wire up Resend or Nodemailer here
    // await sendEmail({ to: process.env.CONTACT_EMAIL, ... })

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
