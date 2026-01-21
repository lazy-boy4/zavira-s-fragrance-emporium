import { z } from "zod";

/**
 * Validation Schemas for all forms
 * Using Zod for type-safe runtime validation
 */

// Password validation with security requirements
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be less than 128 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

// Common email validation
const emailSchema = z
  .string()
  .trim()
  .email("Please enter a valid email address")
  .max(255, "Email must be less than 255 characters");

// Name validation
const nameSchema = z
  .string()
  .trim()
  .min(1, "This field is required")
  .max(100, "Must be less than 100 characters")
  .regex(/^[a-zA-Z\s\-']+$/, "Only letters, spaces, hyphens, and apostrophes allowed");

// ============ AUTH SCHEMAS ============

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
});

export const signupSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
    newsletter: z.boolean().optional(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ============ CHECKOUT SCHEMAS ============

export const shippingSchema = z.object({
  email: emailSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  address: z
    .string()
    .trim()
    .min(5, "Please enter a valid address")
    .max(200, "Address must be less than 200 characters"),
  apartment: z.string().max(100, "Must be less than 100 characters").optional(),
  country: z.string().min(1, "Please select a country"),
  city: z
    .string()
    .trim()
    .min(2, "Please enter a valid city")
    .max(100, "City must be less than 100 characters"),
  zipCode: z
    .string()
    .trim()
    .min(3, "Please enter a valid ZIP code")
    .max(20, "ZIP code must be less than 20 characters"),
  phone: z
    .string()
    .regex(/^[\d\s\-+()]*$/, "Please enter a valid phone number")
    .max(20, "Phone number must be less than 20 characters")
    .optional()
    .or(z.literal("")),
  newsletter: z.boolean().optional(),
});

export const paymentSchema = z.object({
  paymentMethod: z.enum(["card", "mobile", "cod"]),
  cardNumber: z
    .string()
    .regex(/^[\d\s]{13,19}$/, "Please enter a valid card number")
    .optional()
    .or(z.literal("")),
  cardExpiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\s?\/\s?([0-9]{2})$/, "Please enter a valid expiry date (MM/YY)")
    .optional()
    .or(z.literal("")),
  cardCvc: z
    .string()
    .regex(/^[0-9]{3,4}$/, "Please enter a valid CVC")
    .optional()
    .or(z.literal("")),
  cardName: z
    .string()
    .max(100, "Name must be less than 100 characters")
    .optional()
    .or(z.literal("")),
});

// ============ CONTACT SCHEMA ============

export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must be less than 200 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
});

// ============ NEWSLETTER SCHEMA ============

export const newsletterSchema = z.object({
  email: emailSchema,
});

// ============ TYPE EXPORTS ============

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ShippingFormData = z.infer<typeof shippingSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;

/**
 * Sanitize string input to prevent XSS
 * Use this for any user-generated content that will be displayed
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
};
