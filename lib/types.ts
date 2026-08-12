import type { Row } from "@/lib/db";

export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  techStack: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  imageUrl: string | null;
  createdAt: string;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  tags: string[];
  published: boolean;
  createdAt: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asBool(value: unknown): boolean {
  return value === true || value === "true" || value === 1 || value === "1";
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map((item) => asString(item)) : [];
}

function asNullableString(value: unknown): string | null {
  const str = asString(value);
  return str.length > 0 ? str : null;
}

export function mapProject(row: Row): Project {
  return {
    id: asString(row.id),
    title: asString(row.title),
    slug: asString(row.slug),
    description: asString(row.description),
    content: asString(row.content),
    techStack: asStringArray(row.tech_stack),
    liveUrl: asNullableString(row.live_url),
    githubUrl: asNullableString(row.github_url),
    featured: asBool(row.featured),
    imageUrl: asNullableString(row.image_url),
    createdAt: asString(row.created_at),
  };
}

export function mapBlog(row: Row): Blog {
  return {
    id: asString(row.id),
    title: asString(row.title),
    slug: asString(row.slug),
    excerpt: asString(row.excerpt),
    content: asString(row.content),
    coverImage: asNullableString(row.cover_image),
    tags: asStringArray(row.tags),
    published: asBool(row.published),
    createdAt: asString(row.created_at),
  };
}

export function mapMessage(row: Row): Message {
  return {
    id: asString(row.id),
    name: asString(row.name),
    email: asString(row.email),
    subject: asString(row.subject),
    message: asString(row.message),
    read: asBool(row.read),
    createdAt: asString(row.created_at),
  };
}
