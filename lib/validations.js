import { z } from "zod";

export const contactFormSchema = z.object({
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
