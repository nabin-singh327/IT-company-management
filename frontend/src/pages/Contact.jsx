import { useState } from "react";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { submitContactMessage } from "../api/contactApi";

const PURPOSES = ["Course Inquiry", "Technical Support", "Corporate Training", "Other"];

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", purpose: "Course Inquiry", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitContactMessage(form);
      setStatus("success");
      setForm({ name: "", email: "", purpose: "Course Inquiry", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <span className="font-mono text-xs text-teal">09 · contact</span>
      <h1 className="font-display text-3xl font-semibold text-ink mt-2 mb-10">Get in touch</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          {status === "success" ? (
            <div className="border border-teal/30 bg-teal/5 rounded-xl p-6">
              <p className="font-mono text-teal text-sm mb-1">// message sent</p>
              <p className="text-ink/70 text-sm">
                Thanks for reaching out — we'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                required
                placeholder="Full name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
              />
              <select
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm"
              >
                {PURPOSES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <textarea
                name="message"
                required
                placeholder="Your message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="w-full border border-ink/15 rounded-md px-3 py-2.5 text-sm outline-none focus:border-navy"
              />

              {status === "error" && (
                <p className="text-red-500 text-sm">Something went wrong. Try again.</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="bg-navy text-white font-semibold px-6 py-3 rounded-md hover:bg-navy/90 transition-colors disabled:opacity-50"
              >
                {status === "submitting" ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-mono text-xs uppercase text-ink/40 mb-2">Address</h3>
            <p className="text-ink/70 text-sm">Narephat 32, Koteshwor, Kathmandu</p>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase text-ink/40 mb-2">Phone</h3>
            <p className="text-ink/70 text-sm">9851344071 · 9806393939</p>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase text-ink/40 mb-2">Email</h3>
            <p className="text-ink/70 text-sm">infotech@sipalaya.com</p>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase text-ink/40 mb-3">Follow us</h3>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-ink/15 text-ink/60 hover:text-white hover:bg-navy hover:border-navy transition-colors"
              >
                <FaFacebook size={16} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-ink/15 text-ink/60 hover:text-white hover:bg-navy hover:border-navy transition-colors"
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-ink/15 text-ink/60 hover:text-white hover:bg-navy hover:border-navy transition-colors"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-ink/10 h-56">
            <iframe
              title="location map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              src="https://www.google.com/maps?q=Koteshwor,Kathmandu&output=embed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;