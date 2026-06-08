"use client";
import { useState } from "react";

export default function BookingForm() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "", consent: false });

  const update = (k) => (e) =>
    setForm({ ...form, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const submit = async () => {
    if (!form.name || !form.email || !form.consent) {
      setStatus("error-validation");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus("sent");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <h3 style={{ fontSize: 32, marginBottom: 12 }}>Thanks, we'll be in touch.</h3>
        <p className="lead">We've got your details and will email you shortly to find a time.</p>
      </div>
    );
  }

  const label = { display: "block", fontFamily: "var(--font-head)", fontWeight: 600, marginBottom: 10, fontSize: 17 };
  const field = {
    width: "100%",
    padding: "18px 20px",
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "#fff",
    fontSize: 17,
    fontFamily: "var(--font-body)",
    marginBottom: 28,
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <label style={label}>Your name</label>
      <input style={field} placeholder="Jane Smith" value={form.name} onChange={update("name")} />

      <label style={label}>Work email</label>
      <input style={field} placeholder="jane@company.com" value={form.email} onChange={update("email")} />

      <label style={label}>Anything you would like us to know about your team?</label>
      <textarea
        style={{ ...field, minHeight: 130, resize: "vertical" }}
        placeholder="Team size, location, any specific interests..."
        value={form.message}
        onChange={update("message")}
      />

      <label style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16, cursor: "pointer" }}>
        <input type="checkbox" checked={form.consent} onChange={update("consent")} style={{ marginTop: 5, width: 18, height: 18 }} />
        <span>
          I'm happy for Sprout to contact me about my enquiry.
          <br />
          <span style={{ color: "var(--muted)", fontSize: 15 }}>
            We will only use your details to respond to you. See our <a href="#" style={{ textDecoration: "underline" }}>Privacy Policy</a>.
          </span>
        </span>
      </label>

      <label style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 32, cursor: "pointer" }}>
        <input type="checkbox" style={{ width: 18, height: 18 }} />
        <span>Keep me posted on the Sprout app. I'd like to hear when it launches.</span>
      </label>

      {status === "error-validation" && (
        <p style={{ color: "#b3261e", marginBottom: 20 }}>Please add your name, email, and tick the consent box.</p>
      )}
      {status === "error" && (
        <p style={{ color: "#b3261e", marginBottom: 20 }}>Something went wrong sending that. Please try again or email hello@sproutclimate.com.</p>
      )}

      <button className="btn-primary" style={{ width: "100%" }} onClick={submit} disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Book a 20-minute intro call"}
      </button>
    </div>
  );
}
