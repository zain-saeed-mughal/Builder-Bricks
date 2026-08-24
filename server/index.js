const express = require("express");
const cors = require("cors");
const { z } = require("zod");

const app = express();
const PORT = process.env.API_PORT || 4000;

const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "Name is too long."),
  email: z.email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(30, "Phone number is too long."),
  company: z.string().trim().max(100, "Company name is too long.").optional(),
  projectType: z.enum(
    [
      "Residential",
      "Commercial",
      "Mixed Use",
      "Interior",
      "Investment",
      "Other",
    ],
    { message: "Select a project type." },
  ),
  budget: z.enum(
    [
      "Under $250k",
      "$250k – $1M",
      "$1M – $5M",
      "$5M – $15M",
      "$15M+",
      "Not sure yet",
    ],
    { message: "Select a budget range." },
  ),
  preferredLocation: z
    .string()
    .trim()
    .min(2, "Please enter a preferred location.")
    .max(100),
  message: z
    .string()
    .trim()
    .min(20, "Please share a bit more about your project.")
    .max(2000, "Message is too long."),
  consent: z.boolean().refine((value) => value === true, {
    message: "Consent is required to submit this form.",
  }),
});

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "builder-bricks-api" });
});

/**
 * Contact form endpoint (Express + Node.js)
 * Connect email/CRM here (Resend, SendGrid, etc.)
 * Never expose secrets in frontend code.
 */
app.post("/api/contact", (req, res) => {
  try {
    const parsed = contactFormSchema.safeParse(req.body);

    if (!parsed.success) {
      const firstIssue =
        parsed.error.issues[0]?.message ?? "Invalid form data.";
      return res.status(400).json({ error: firstIssue });
    }

    const data = parsed.data;

    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] New inquiry received:", {
        fullName: data.fullName,
        email: data.email,
        projectType: data.projectType,
        budget: data.budget,
        preferredLocation: data.preferredLocation,
      });
    }

    // Example: await resend.emails.send({ ... })

    return res.status(200).json({
      message:
        "Thank you — your inquiry has been received. Our team will respond shortly.",
    });
  } catch (error) {
    console.error("[contact] Error:", error);
    return res.status(500).json({
      error: "Unable to process your request. Please try again later.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Express API running at http://localhost:${PORT}`);
});
