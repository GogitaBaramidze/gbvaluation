import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  assetType: z.string().min(1, "Please describe the asset type"),
  message: z.string().min(10, "Please provide at least 10 characters"),
  contactMethod: z.enum(["email", "phone", "either"]),
  honeypot: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
