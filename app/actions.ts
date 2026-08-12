"use server";

import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";
import { signIn, signOut, auth } from "@/auth";
import { sql } from "@/lib/db";
import { sendEmail, contactAlertHtml, replyEmailHtml } from "@/lib/resend";
import {
  contactSchema,
  projectSchema,
  blogSchema,
  replySchema,
  parseWithErrors,
  type ContactInput,
} from "@/lib/validation";
import { slugify } from "@/lib/utils";
import { mapMessage } from "@/lib/types";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("You must be signed in to perform this action.");
  }
}

function toNullableString(value: unknown): string | null {
  const str = typeof value === "string" ? value.trim() : "";
  return str.length > 0 ? str : null;
}

// ==================== AUTH ====================

export type LoginState = {
  error?: string;
};

export async function loginAction(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");
  const callbackUrl = (formData.get("callbackUrl") as string) || "/admin";

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password. Please try again." };
    }
    throw error;
  }

  return {};
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}

// ==================== CONTACT ====================

export type ContactState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof ContactInput, string>>;
};

export async function submitContact(prevState: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = parseWithErrors(contactSchema, {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: "Please fix the highlighted fields and try again.", fieldErrors: parsed.errors };
  }

  const { name, email, subject, message } = parsed.data;

  try {
    await sql`
      INSERT INTO messages (name, email, subject, message)
      VALUES (${name}, ${email}, ${subject}, ${message})
    `;
  } catch {
    return { error: "We could not save your message right now. Please try again in a moment." };
  }

  const recipient = process.env.CONTACT_EMAIL_RECIPIENT;
  if (recipient) {
    try {
      await sendEmail({
        to: recipient,
        subject: `New contact message: ${subject}`,
        html: contactAlertHtml({ name, email, subject, message }),
        replyTo: email,
      });
    } catch {
      // Email alert is best-effort; the message is already persisted.
    }
  }

  return { success: true };
}

// ==================== PROJECTS ====================

export type ActionResult<T = undefined> =
  | { success: true; data?: T }
  | { success: false; error: string; fieldErrors?: Record<string, string> };

export async function createProject(input: unknown): Promise<ActionResult> {
  await requireAdmin();

  const parsed = parseWithErrors(projectSchema, input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields.", fieldErrors: parsed.errors };
  }

  const { title, description, content, techStack, featured } = parsed.data;
  const slug = parsed.data.slug?.trim() || slugify(title);
  const liveUrl = toNullableString(parsed.data.liveUrl);
  const githubUrl = toNullableString(parsed.data.githubUrl);
  const imageUrl = toNullableString(parsed.data.imageUrl);

  try {
    await sql`
      INSERT INTO projects (title, slug, description, content, tech_stack, live_url, github_url, image_url, featured)
      VALUES (${title}, ${slug}, ${description}, ${content}, ${techStack}, ${liveUrl}, ${githubUrl}, ${imageUrl}, ${featured})
    `;
  } catch {
    return { success: false, error: "A project with this slug already exists." };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function updateProject(id: string, input: unknown): Promise<ActionResult> {
  await requireAdmin();

  const parsed = parseWithErrors(projectSchema, input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields.", fieldErrors: parsed.errors };
  }

  const { title, description, content, techStack, featured } = parsed.data;
  const slug = parsed.data.slug?.trim() || slugify(title);
  const liveUrl = toNullableString(parsed.data.liveUrl);
  const githubUrl = toNullableString(parsed.data.githubUrl);
  const imageUrl = toNullableString(parsed.data.imageUrl);

  try {
    await sql`
      UPDATE projects
      SET title = ${title},
          slug = ${slug},
          description = ${description},
          content = ${content},
          tech_stack = ${techStack},
          live_url = ${liveUrl},
          github_url = ${githubUrl},
          image_url = ${imageUrl},
          featured = ${featured}
      WHERE id = ${id}
    `;
  } catch {
    return { success: false, error: "Another project already uses this slug." };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function deleteProject(id: string): Promise<ActionResult> {
  await requireAdmin();
  await sql`DELETE FROM projects WHERE id = ${id}`;
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function toggleProjectFeatured(id: string, featured: boolean): Promise<ActionResult> {
  await requireAdmin();
  await sql`UPDATE projects SET featured = ${featured} WHERE id = ${id}`;
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  return { success: true };
}

// ==================== BLOGS ====================

export async function createBlog(input: unknown): Promise<ActionResult> {
  await requireAdmin();

  const parsed = parseWithErrors(blogSchema, input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields.", fieldErrors: parsed.errors };
  }

  const { title, excerpt, content, tags, published } = parsed.data;
  const slug = parsed.data.slug?.trim() || slugify(title);
  const coverImage = toNullableString(parsed.data.coverImage);

  try {
    await sql`
      INSERT INTO blogs (title, slug, excerpt, content, tags, cover_image, published)
      VALUES (${title}, ${slug}, ${excerpt}, ${content}, ${tags}, ${coverImage}, ${published})
    `;
  } catch {
    return { success: false, error: "A blog post with this slug already exists." };
  }

  revalidatePath("/blog");
  revalidatePath("/admin");
  revalidatePath("/admin/blogs");
  return { success: true };
}

export async function updateBlog(id: string, input: unknown): Promise<ActionResult> {
  await requireAdmin();

  const parsed = parseWithErrors(blogSchema, input);
  if (!parsed.success) {
    return { success: false, error: "Please fix the highlighted fields.", fieldErrors: parsed.errors };
  }

  const { title, excerpt, content, tags, published } = parsed.data;
  const slug = parsed.data.slug?.trim() || slugify(title);
  const coverImage = toNullableString(parsed.data.coverImage);

  try {
    await sql`
      UPDATE blogs
      SET title = ${title},
          slug = ${slug},
          excerpt = ${excerpt},
          content = ${content},
          tags = ${tags},
          cover_image = ${coverImage},
          published = ${published}
      WHERE id = ${id}
    `;
  } catch {
    return { success: false, error: "Another blog post already uses this slug." };
  }

  revalidatePath("/blog");
  revalidatePath("/blog/" + slug);
  revalidatePath("/admin");
  revalidatePath("/admin/blogs");
  return { success: true };
}

export async function deleteBlog(id: string): Promise<ActionResult> {
  await requireAdmin();
  await sql`DELETE FROM blogs WHERE id = ${id}`;
  revalidatePath("/blog");
  revalidatePath("/admin");
  revalidatePath("/admin/blogs");
  return { success: true };
}

export async function toggleBlogPublished(id: string, published: boolean): Promise<ActionResult> {
  await requireAdmin();
  await sql`UPDATE blogs SET published = ${published} WHERE id = ${id}`;
  revalidatePath("/blog");
  revalidatePath("/admin");
  revalidatePath("/admin/blogs");
  return { success: true };
}

// ==================== MESSAGES ====================

export async function markMessageRead(id: string, read: boolean): Promise<ActionResult> {
  await requireAdmin();
  await sql`UPDATE messages SET read = ${read} WHERE id = ${id}`;
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  return { success: true };
}

export async function replyToMessage(messageId: string, input: unknown): Promise<ActionResult> {
  await requireAdmin();

  const parsed = parseWithErrors(replySchema, input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please enter a reply message.",
      fieldErrors: parsed.errors,
    };
  }

  const rows = await sql`SELECT * FROM messages WHERE id = ${messageId} LIMIT 1`;
  if (rows.length === 0) {
    return { success: false, error: "This message no longer exists." };
  }
  const message = mapMessage(rows[0]);

  const replyTo = process.env.ADMIN_EMAIL;

  try {
    await sendEmail({
      to: message.email,
      subject: `Re: ${message.subject}`,
      html: replyEmailHtml({
        reply: parsed.data.body,
        originalName: message.name,
        originalEmail: message.email,
        originalSubject: message.subject,
        originalMessage: message.message,
      }),
      replyTo: replyTo ?? undefined,
    });
  } catch {
    return { success: false, error: "The reply could not be sent right now. Please try again." };
  }

  await sql`UPDATE messages SET read = true WHERE id = ${messageId}`;
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteMessage(id: string): Promise<ActionResult> {
  await requireAdmin();
  await sql`DELETE FROM messages WHERE id = ${id}`;
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  return { success: true };
}
