import { z } from "zod";

const optionalUrl = z.union([z.url(), z.literal("")]).optional();

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password is too long"),
});

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.email("Please enter a valid email address"),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
});

export const projectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title is too long"),
  slug: z.string().trim().min(1).max(240).optional(),
  description: z.string().trim().max(1000, "Description is too long").optional().default(""),
  content: z.string().max(20000, "Content is too long").optional().default(""),
  techStack: z.array(z.string().trim().max(50)).max(30).optional().default([]),
  liveUrl: optionalUrl,
  githubUrl: optionalUrl,
  imageUrl: optionalUrl,
  featured: z.boolean().optional().default(false),
});

export const blogSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title is too long"),
  slug: z.string().trim().min(1).max(240).optional(),
  excerpt: z
    .string()
    .trim()
    .max(400, "Excerpt is too long")
    .optional()
    .default(""),
  content: z.string().min(10, "Content must be at least 10 characters").max(50000, "Content is too long"),
  tags: z.array(z.string().trim().max(50)).max(20).optional().default([]),
  coverImage: optionalUrl,
  published: z.boolean().optional().default(false),
});

export const replySchema = z.object({
  body: z
    .string()
    .trim()
    .min(1, "Reply cannot be empty")
    .max(5000, "Reply is too long"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type BlogInput = z.infer<typeof blogSchema>;
export type ReplyInput = z.infer<typeof replySchema>;

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export function parseWithErrors<T extends z.ZodTypeAny>(schema: T, data: unknown) {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true as const, data: result.data as z.infer<T> };
  }
  const errors: FieldErrors<z.infer<T>> = {};
  for (const issue of result.error.issues) {
    const path = issue.path[0];
    if (typeof path === "string" || typeof path === "number") {
      errors[path as keyof z.infer<T>] = issue.message;
    }
  }
  return { success: false as const, errors };
}
