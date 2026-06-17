import { Resend } from "resend";

// ----------------------------------------------------------------
// EMAIL SETUP (one-time, in Vercel):
// 1. Sign up free at https://resend.com
// 2. Create an API key (starts with "re_")
// 3. In Vercel: Project > Settings > Environment Variables
//      Name:  RESEND_API_KEY     Value: your re_... key
//    Then redeploy.
// 4. Sender: onboarding@resend.dev works out of the box for testing.
//    To send from your own domain later, verify it in Resend and
//    change FROM_ADDRESS below.
// ----------------------------------------------------------------

const TO_ADDRESS = "hello@renyu.co.uk";
const FROM_ADDRESS = "Renyu Website <onboarding@resend.dev>";

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  const { name, email, message, appInterest } = data;

  if (!name || !email) {
    return Response.json({ error: "Missing name or email" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;

  // No key configured: do NOT fake success. Tell the client so the form
  // can show a fallback (email Eddie directly) instead of a false "sent".
  if (!key) {
    console.log("Enquiry received but RESEND_API_KEY is not set:", {
      name,
      email,
      message,
      appInterest,
    });
    return Response.json(
      { error: "Email not configured", code: "no_key" },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(key);
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: email,
      subject: `New intro call request from ${name}`,
      text:
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Wants app updates: ${appInterest ? "Yes" : "No"}\n\n` +
        `Message:\n${message || "(none)"}`,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return Response.json({ error: "Send failed" }, { status: 500 });
  }
}
