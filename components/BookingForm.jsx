"use client";
import { useState } from "react";

export default function BookingForm() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    consent: false,
    appInterest: false,
  });

  const update = (k) => (e) =>
    setForm({
      ...form,
      [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });

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
      if (res.ok) {
        setStatus("sent");
      } else {
        const body = await res.json().catch(() => ({}));
        setStatus(body.code === "no_key" ? "error-config" : "error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <h3 style={{ fontSize: 32, marginBottom: 12 }}>
          Thanks, we&apos;ll be in touch.
        </h3>
        <p className="lead-p" style={{ margin: "0 auto" }}>
          We&apos;ve got your details and will email you shortly to find a time.
        </p>
      </div>
    );
  }

  return (
    <div>
      <label className="fl">Your name</label>
      <input
        className="field"
        placeholder="Jane Smith"
        value={form.name}
        onChange={update("name")}
      />

      <label className="fl">Work email</label>
      <input
        className="field"
        placeholder="jane@company.com"
        value={form.email}
        onChange={update("email")}
      />

      <label className="fl">
        Anything you would like us to know about your team?
      </label>
      <textarea
        className="field"
        style={{ minHeight: 130, resize: "vertical" }}
        placeholder="Team size, location, any specific interests..."
        value={form.message}
        onChange={update("message")}
      />

      <label className="consent">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={update("consent")}
        />
        <span>
          I&apos;m happy for Sprout to contact me about my enquiry.
          <br />
          <span className="sm">
            We will only use your details to respond to you. See our{" "}
            <a href="/privacy" style={{ textDecoration: "underline" }}>
              Privacy Policy
            </a>
            .
          </span>
        </span>
      </label>

      <label className="consent" style={{ marginBottom: 30 }}>
        <input
          type="checkbox"
          checked={form.appInterest}
          onChange={update("appInterest")}
        />
        <span>
          Keep me posted on the Sprout app. I&apos;d like to hear when it
          launches.
        </span>
      </label>

      {status === "error-validation" && (
        <p style={{ color: "#b3261e", marginBottom: 20 }}>
          Please add your name, email, and tick the consent box.
        </p>
      )}
      {status === "error-config" && (
        <p style={{ color: "#b3261e", marginBottom: 20 }}>
          We couldn&apos;t submit that just now. Please try again in a
          moment, and we&apos;ll be in touch as soon as it comes through.
        </p>
      )}
      {status === "error" && (
        <p style={{ color: "#b3261e", marginBottom: 20 }}>
          Something went wrong sending that. Please try again in a moment.
        </p>
      )}

      <button
        className="btn btn-lg"
        style={{ width: "100%", justifyContent: "center" }}
        onClick={submit}
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Book a 20-minute intro call"}
      </button>
    </div>
  );
}
