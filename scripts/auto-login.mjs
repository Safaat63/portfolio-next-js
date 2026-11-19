import { chromium } from "@playwright/test";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

// Helper to load credentials from .env if present
function loadEnv() {
  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) return {};
  const content = readFileSync(envPath, "utf-8");
  const env = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (key && rest.length > 0) {
      env[key.trim()] = rest.join("=").trim().replace(/^["']|["']$/g, "");
    }
  }
  return env;
}

const localEnv = loadEnv();
const BASE_URL = process.env.NEXTAUTH_URL || localEnv.NEXTAUTH_URL || "http://localhost:3000";
const EMAIL = process.env.ADMIN_EMAIL || localEnv.ADMIN_EMAIL || "safaatmunajat63@gmail.com";
const PASSWORD = process.env.ADMIN_PASSWORD || localEnv.ADMIN_PASSWORD || "Admin@123";
const AUTH_SECRET = process.env.AUTH_SECRET || localEnv.AUTH_SECRET || "";

async function run() {
  console.log("🚀 Starting Playwright auto-login browser...");
  
  // Launch visible browser
  const browser = await chromium.launch({
    headless: false,
    slowMo: 80,
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  console.log(`🌐 Navigating to ${BASE_URL}/admin/login ...`);
  await page.goto(`${BASE_URL}/admin/login`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#login-email", { timeout: 15000 });

  console.log(`🔑 Typing credentials for: ${EMAIL} ...`);
  await page.fill("#login-email", EMAIL);
  await page.fill("#login-password", PASSWORD);

  console.log("⏳ Waiting for Turnstile verification token...");
  try {
    await page.waitForFunction(() => {
      const el = document.querySelector('input[name="cf-turnstile-response"]');
      return el && el.value && el.value.length > 0;
    }, { timeout: 10000 });
    console.log("✨ Turnstile token received!");
  } catch {
    console.log("⚠️ Turnstile token wait timed out, attempting submission anyway...");
  }

  console.log("🖱️ Clicking 'Sign In'...");
  await page.click('button[type="submit"]');

  // Wait until redirected to /admin
  try {
    await page.waitForURL("**/admin", { timeout: 15000 });
    console.log("✅ Successfully logged in! You are now in the admin panel.");
  } catch {
    console.log("ℹ️ Check browser window - current URL is:", page.url());
  }

  // Keep the process alive so the user can interact with the open browser
  console.log("👉 The browser window is kept open for your use. Press Ctrl+C in this terminal when finished.");
  await new Promise(() => {});
}

run().catch((err) => {
  console.error("❌ Auto-login failed:", err);
  process.exit(1);
});
