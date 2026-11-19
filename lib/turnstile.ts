export interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

export async function verifyTurnstileToken(token: string | null | undefined, remoteIp?: string): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    // If not configured in development, avoid blocking unless strict
    console.warn("CLOUDFLARE_TURNSTILE_SECRET_KEY is not defined in environment variables.");
    return { success: false, error: "CAPTCHA configuration is missing." };
  }

  if (!token) {
    return { success: false, error: "Please complete the CAPTCHA verification." };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    const data = (await response.json()) as TurnstileVerifyResponse;

    if (!data.success) {
      const errorCodes = data["error-codes"]?.join(", ") || "verification-failed";
      return { success: false, error: `CAPTCHA verification failed (${errorCodes}).` };
    }

    return { success: true };
  } catch (err) {
    console.error("Turnstile verification request error:", err);
    return { success: false, error: "Could not verify CAPTCHA. Please try again." };
  }
}
