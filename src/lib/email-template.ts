const BASE_URL = process.env.BETTER_AUTH_URL ?? "https://3cai.app";

const COLORS = {
  bg: "#f3f4f8",
  card: "#ffffff",
  cardBorder: "#e2e4ec",
  cardBorderTop: "#c8e645",
  primary: "#c8e645",
  primaryDark: "#9bb830",
  primaryText: "#1e2035",
  heading: "#1e2035",
  body: "#4a4f6a",
  muted: "#7a7f9a",
  subtle: "#9ca3b8",
  footerText: "#aab0c8",
  white: "#ffffff",
  divider: "#eceef5",
  badgeBg: "#f0f7d4",
  badgeText: "#5a7a10",
  alertBg: "#fff8f0",
  alertBorder: "#f59e0b",
  alertBadge: "#f59e0b",
  alertBadgeText: "#7c4a00",
  dangerBg: "#fff5f5",
  dangerBorder: "#ef4444",
  dangerBadge: "#ef4444",
  dangerBadgeText: "#7c0000",
  infoBg: "#f0f7ff",
  infoBorder: "#3b82f6",
  infoBadge: "#3b82f6",
  infoBadgeText: "#1e3a6e",
};

// ─── Shell ────────────────────────────────────────────────────────────────────

const shell = (content: string, accentColor = COLORS.cardBorderTop) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>3CAI</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${COLORS.bg};font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${COLORS.bg};">
    <tr>
      <td align="center" style="padding:48px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;">

          <!-- HEADER -->
          <tr>
            <td style="padding-bottom:28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <span style="font-family:'Courier New',Courier,monospace;color:${COLORS.heading};font-size:18px;font-weight:700;letter-spacing:2px;">3CAI</span>
                    <span style="font-family:'Courier New',Courier,monospace;color:${COLORS.subtle};font-size:11px;margin-left:10px;letter-spacing:1px;">Career Intelligence</span>
                  </td>
                  <td align="right">
                    <span style="font-family:'Courier New',Courier,monospace;color:${COLORS.subtle};font-size:11px;">${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CARD -->
          <tr>
            <td style="background-color:${COLORS.card};border:1px solid ${COLORS.cardBorder};border-top:3px solid ${accentColor};border-radius:8px;padding:40px 36px;">
              ${content}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding-top:28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <p style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;color:${COLORS.footerText};font-size:12px;line-height:1.6;">
                      © ${new Date().getFullYear()} 3CAI · AI-Powered Career Intelligence
                    </p>
                    <p style="margin:0;font-size:12px;line-height:1.8;">
                      <a href="${BASE_URL}/settings" style="color:${COLORS.footerText};text-decoration:none;">Preferences</a>
                      <span style="color:${COLORS.footerText};margin:0 8px;">·</span>
                      <a href="${BASE_URL}/settings/billing" style="color:${COLORS.footerText};text-decoration:none;">Billing</a>
                      <span style="color:${COLORS.footerText};margin:0 8px;">·</span>
                      <a href="${BASE_URL}" style="color:${COLORS.footerText};text-decoration:none;">Dashboard</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

// ─── Shared primitives ────────────────────────────────────────────────────────

const badge = (text: string, bg: string, color: string) => `
  <span style="display:inline-block;background-color:${bg};color:${color};font-family:'Courier New',Courier,monospace;font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;padding:4px 10px;border-radius:4px;">${text}</span>`;

const ctaButton = (label: string, href: string, bg = COLORS.primary, color = COLORS.primaryText) => `
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:32px;">
    <tr>
      <td style="background-color:${bg};border-radius:6px;">
        <a href="${href}"
          style="display:inline-block;padding:14px 28px;color:${color};font-family:'Courier New',Courier,monospace;font-size:13px;font-weight:700;letter-spacing:1px;text-decoration:none;">
          ${label} →
        </a>
      </td>
    </tr>
  </table>`;

const divider = () =>
  `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:28px 0 0;">
    <tr><td style="border-top:1px solid ${COLORS.divider};font-size:0;">&nbsp;</td></tr>
  </table>`;

const infoBox = (lines: { label: string; val: string }[], bg = COLORS.badgeBg, border = COLORS.primaryDark) => `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
    style="background-color:${bg};border-left:3px solid ${border};border-radius:0 6px 6px 0;margin:24px 0;">
    <tr>
      <td style="padding:16px 20px;">
        ${lines.map(({ label: l, val: v }) => `
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:6px;">
            <tr>
              <td style="font-family:'Courier New',Courier,monospace;color:${COLORS.muted};font-size:11px;letter-spacing:1px;width:110px;vertical-align:top;">${l}</td>
              <td style="font-family:'Courier New',Courier,monospace;color:${COLORS.heading};font-size:12px;font-weight:600;letter-spacing:0.5px;vertical-align:top;">${v}</td>
            </tr>
          </table>`).join("")}
      </td>
    </tr>
  </table>`;

const footnote = (html: string) =>
  `<p style="margin:20px 0 0;font-family:Georgia,'Times New Roman',serif;color:${COLORS.muted};font-size:12px;line-height:1.8;">${html}</p>`;

// ─── 1. Email Verification ────────────────────────────────────────────────────

export const getVerificationTemplate = (url: string) =>
  shell(`
    ${badge("Action Required", COLORS.badgeBg, COLORS.badgeText)}

    <h1 style="margin:16px 0 8px;font-family:'Courier New',Courier,monospace;color:${COLORS.heading};font-size:24px;font-weight:700;letter-spacing:-0.5px;">Verify your email address</h1>
    <p style="margin:0 0 24px;font-family:Georgia,'Times New Roman',serif;color:${COLORS.body};font-size:15px;line-height:1.7;">
      Thanks for signing up for 3CAI. Please confirm your email address to activate your account and access your career intelligence tools.
    </p>

    ${infoBox([
      { label: "Recipient", val: url.includes("email=") ? decodeURIComponent(url.split("email=")[1]?.split("&")[0] ?? "—") : "—" },
      { label: "Expires in", val: "24 hours" },
    ])}

    ${ctaButton("Verify Email Address", url)}

    ${divider()}

    ${footnote(`Button not working? <a href="${url}" style="color:${COLORS.primaryDark};text-decoration:none;word-break:break-all;">Copy this link</a> into your browser.<br/>If you didn't create a 3CAI account, you can safely ignore this email.`)}
  `);

// ─── 2. Existing Account ──────────────────────────────────────────────────────

export const getExistingAccountTemplate = () =>
  shell(`
    ${badge("Security Notice", COLORS.alertBg, COLORS.alertBadgeText)}

    <h1 style="margin:16px 0 8px;font-family:'Courier New',Courier,monospace;color:${COLORS.heading};font-size:24px;font-weight:700;letter-spacing:-0.5px;">Sign-in attempt on your account</h1>
    <p style="margin:0 0 24px;font-family:Georgia,'Times New Roman',serif;color:${COLORS.body};font-size:15px;line-height:1.7;">
      Someone attempted to register a new account using this email address. Since an account already exists, no changes were made. If this was you, simply sign in below.
    </p>

    ${infoBox([
      { label: "Event", val: "Registration attempt blocked" },
      { label: "Result", val: "No changes made to your account" },
    ], COLORS.alertBg, COLORS.alertBorder)}

    ${ctaButton("Sign In to Your Account", `${BASE_URL}/sign-in`)}

    ${divider()}

    ${footnote(`If this wasn't you, your account is safe — no action is needed. As a precaution, you may want to <a href="${BASE_URL}/settings/security" style="color:${COLORS.primaryDark};text-decoration:none;">review your account security settings</a>.`)}
  `, COLORS.alertBorder);

// ─── 3. Subscription Welcome ──────────────────────────────────────────────────

export const getWelcomeTemplate = (planName: string, tokensGranted?: number) =>
  shell(`
    ${badge("Subscription Active", COLORS.badgeBg, COLORS.badgeText)}

    <h1 style="margin:16px 0 8px;font-family:'Courier New',Courier,monospace;color:${COLORS.heading};font-size:24px;font-weight:700;letter-spacing:-0.5px;">Welcome to ${planName}</h1>
    <p style="margin:0 0 24px;font-family:Georgia,'Times New Roman',serif;color:${COLORS.body};font-size:15px;line-height:1.7;">
      Your subscription is now active. You have full access to 3CAI's career intelligence suite, including resume analysis, interview preparation, job match scoring, and your AI career roadmap.
    </p>

    ${infoBox([
      { label: "Plan", val: planName },
      ...(tokensGranted ? [{ label: "Credits", val: `${tokensGranted.toLocaleString()} tokens added` }] : []),
      { label: "Billing", val: "Monthly renewal" },
      { label: "Status", val: "Active" },
    ])}

    ${ctaButton("Go to Dashboard", `${BASE_URL}/workspace`)}

    ${divider()}

    ${footnote(`Need help getting started? Visit our <a href="${BASE_URL}/docs" style="color:${COLORS.primaryDark};text-decoration:none;">documentation</a> or <a href="${BASE_URL}/support" style="color:${COLORS.primaryDark};text-decoration:none;">contact support</a>. We're here to help.`)}
  `);

// ─── 4. Subscription Updated ──────────────────────────────────────────────────

export const getUpdateTemplate = (previousPlan: string, newPlan: string, tokensGranted?: number) =>
  shell(`
    ${badge("Plan Updated", COLORS.infoBg, COLORS.infoBadgeText)}

    <h1 style="margin:16px 0 8px;font-family:'Courier New',Courier,monospace;color:${COLORS.heading};font-size:24px;font-weight:700;letter-spacing:-0.5px;">Your plan has been updated</h1>
    <p style="margin:0 0 24px;font-family:Georgia,'Times New Roman',serif;color:${COLORS.body};font-size:15px;line-height:1.7;">
      Your subscription has been successfully changed. The new plan is effective immediately and your credit balance has been updated to reflect this change.
    </p>

    ${infoBox([
      { label: "Previous plan", val: previousPlan },
      { label: "New plan", val: newPlan },
      ...(tokensGranted ? [{ label: "Credits", val: `${tokensGranted.toLocaleString()} tokens added` }] : []),
      { label: "Effective", val: "Immediately" },
    ], COLORS.infoBg, COLORS.infoBorder)}

    ${ctaButton("View Billing Details", `${BASE_URL}/settings/billing`)}

    ${divider()}

    ${footnote(`If you didn't authorize this change, please <a href="${BASE_URL}/settings/billing" style="color:${COLORS.primaryDark};text-decoration:none;">review your billing details</a> and contact our support team immediately.`)}
  `, COLORS.infoBorder);

// ─── 5. Subscription Cancelled ────────────────────────────────────────────────

export const getCancellationTemplate = (planName: string, accessUntil?: Date) =>
  shell(`
    ${badge("Subscription Ended", COLORS.dangerBg, COLORS.dangerBadgeText)}

    <h1 style="margin:16px 0 8px;font-family:'Courier New',Courier,monospace;color:${COLORS.heading};font-size:24px;font-weight:700;letter-spacing:-0.5px;">Your ${planName} plan has been cancelled</h1>
    <p style="margin:0 0 24px;font-family:Georgia,'Times New Roman',serif;color:${COLORS.body};font-size:15px;line-height:1.7;">
      Your cancellation has been processed and you won't be charged again.
      ${accessUntil
        ? `You'll retain full access to all features until <strong style="color:${COLORS.heading};">${accessUntil.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</strong>.`
        : "Your access will continue until the end of your current billing period."
      }
    </p>

    ${infoBox([
      { label: "Plan", val: planName },
      { label: "Status", val: "Cancelled" },
      { label: "Access ends", val: accessUntil ? accessUntil.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "End of billing period" },
      { label: "Auto-renewal", val: "Disabled" },
    ], COLORS.dangerBg, COLORS.dangerBorder)}

    ${ctaButton("Reactivate Subscription", `${BASE_URL}/pricing`)}

    ${divider()}

    ${footnote(`Changed your mind? You can reactivate at any time from the <a href="${BASE_URL}/pricing" style="color:${COLORS.primaryDark};text-decoration:none;">pricing page</a>. Your account data is retained for 30 days after access ends.`)}
  `, COLORS.dangerBorder);

// ─── 6. Password Reset ───────────────────────────────────────────────────────

export const getPasswordResetTemplate = (url: string) =>
  shell(`
    ${badge("Password Reset", COLORS.alertBg, COLORS.alertBadgeText)}

    <h1 style="margin:16px 0 8px;font-family:'Courier New',Courier,monospace;color:${COLORS.heading};font-size:24px;font-weight:700;letter-spacing:-0.5px;">Reset your password</h1>
    <p style="margin:0 0 24px;font-family:Georgia,'Times New Roman',serif;color:${COLORS.body};font-size:15px;line-height:1.7;">
      We received a request to reset the password for your 3CAI account. Click the button below to choose a new password. This link is valid for one hour.
    </p>

    ${infoBox([
      { label: "Request type", val: "Password reset" },
      { label: "Expires in", val: "1 hour" },
    ], COLORS.alertBg, COLORS.alertBorder)}

    ${ctaButton("Reset Password", url)}

    ${divider()}

    ${footnote(`Didn't request a password reset? Your account is safe — simply ignore this email and your password will remain unchanged.<br/>If you're experiencing unexpected activity, please <a href="${BASE_URL}/support" style="color:${COLORS.primaryDark};text-decoration:none;">contact support</a>.`)}
  `, COLORS.alertBorder);