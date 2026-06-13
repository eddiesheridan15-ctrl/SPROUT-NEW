import { Resend } from "resend";

// ----------------------------------------------------------------
// EMAIL SETUP (do this when you deploy):
// 1. Sign up free at https://resend.com
// 2. Create an API key
// 3. In Vercel, add an Environment Variable:  RESEND_API_KEY = your_key
// 4. Verify your sending domain in Resend, or use their test sender to start.
// Until a key is set, the form still "succeeds" so you can preview the site.
// ----------------------------------------------------------------

const TO_ADDRESS = "eddiesheridan15@gmail.com";
const FROM_ADDRESS = "Sprout Website <onboarding@resend.dev>"; // swap to your verified domain later

export async function POST(request) {
  const data = await request.json();
  const { name, email, message } = data;

  if (!name || !email) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;

  // No key yet (preview mode): pretend success so the form flow works.
  if (!key) {
    console.log("New enquiry (no email key set):", { name, email, message });
    return Response.json({ ok: true, preview: true });
  }

  try {
    const resend = new Resend(key);
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: email,
      subject: `New intro call request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message || "(none)"}`,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return Response.json({ error: "Send failed" }, { status: 500 });
  }
}
