const BASE_URL = process.env.BETTER_AUTH_URL ?? "https://3cai.app";

const shell = (content: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>3CAI</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#080808;font-family:'Courier New',Courier,monospace;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#080808;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:580px;">

          <!-- HEADER -->
          <tr>
            <td style="padding-bottom:32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <span style="color:#00ff41;font-size:20px;font-weight:700;letter-spacing:4px;">3CAI</span>
                    <span style="color:#333;font-size:12px;margin-left:12px;letter-spacing:2px;">SYSTEM MAIL</span>
                  </td>
                  <td align="right">
                    <span style="color:#222;font-size:11px;letter-spacing:1px;">${new Date().toISOString().split("T")[0]}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CARD -->
          <tr>
            <td style="background-color:#0d0d0d;border:1px solid #1a1a1a;border-top:2px solid #00ff41;padding:36px 32px;">
              ${content}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding-top:24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="border-top:1px solid #1a1a1a;padding-top:20px;">
                    <p style="margin:0;color:#2a2a2a;font-size:11px;letter-spacing:1px;">3CAI · AI-Powered Career Intelligence</p>
                    <p style="margin:6px 0 0;color:#1e1e1e;font-size:10px;">
                      <a href="${BASE_URL}/settings" style="color:#2a2a2a;text-decoration:none;">Manage preferences</a>
                      &nbsp;·&nbsp;
                      <a href="${BASE_URL}/settings/billing" style="color:#2a2a2a;text-decoration:none;">Billing</a>
                      &nbsp;·&nbsp;
                      <a href="${BASE_URL}" style="color:#2a2a2a;text-decoration:none;">Dashboard</a>
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

// ─── Shared primitives ───────────────────────────────────────────────────────

const terminalBlock = (lines: string[]) => `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
    style="background-color:#050505;border-left:3px solid #00ff41;margin:24px 0;">
    <tr>
      <td style="padding:16px 20px;">
        ${lines
          .map(
            (l) =>
              `<p style="margin:4px 0;color:#00ff41;font-size:13px;letter-spacing:1px;">${l}</p>`
          )
          .join("")}
      </td>
    </tr>
  </table>`;

const ctaButton = (label: string, href: string) => `
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;">
    <tr>
      <td style="background-color:#00ff41;border-radius:2px;">
        <a href="${href}"
          style="display:inline-block;padding:14px 28px;color:#000000;font-family:'Courier New',Courier,monospace;
                 font-size:13px;font-weight:700;letter-spacing:2px;text-decoration:none;">
          ${label} →
        </a>
      </td>
    </tr>
  </table>`;

const divider = () =>
  `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:24px 0;">
    <tr><td style="border-top:1px solid #1a1a1a;font-size:0;">&nbsp;</td></tr>
  </table>`;

const label = (text: string) =>
  `<p style="margin:0 0 8px;color:#333;font-size:10px;letter-spacing:3px;text-transform:uppercase;">${text}</p>`;

const value = (text: string) =>
  `<p style="margin:0 0 16px;color:#e0e0e0;font-size:15px;letter-spacing:1px;">${text}</p>`;

// ─── 1. Email Verification ───────────────────────────────────────────────────

export const getVerificationTemplate = (url: string) =>
  shell(`
    <p style="margin:0 0 4px;color:#00ff41;font-size:11px;letter-spacing:3px;">IDENTITY_VERIFICATION</p>
    <h1 style="margin:0 0 24px;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:2px;">Confirm your email</h1>

    <p style="margin:0 0 8px;color:#888;font-size:14px;line-height:1.7;">
      One step left. Verify your address to activate your 3CAI account and unlock your career intelligence suite.
    </p>

    ${terminalBlock([
      `> RECIPIENT : ${url.includes("email=") ? decodeURIComponent(url.split("email=")[1]?.split("&")[0] ?? "—") : "—"}`,
      `> ACTION    : EMAIL_VERIFY`,
      `> EXPIRES   : 24 hours`,
      `> STATUS    : AWAITING_CONFIRMATION`,
    ])}

    ${ctaButton("VERIFY EMAIL ADDRESS", url)}

    ${divider()}

    <p style="margin:0;color:#333;font-size:11px;line-height:1.8;">
      Button not working? Paste this link into your browser:<br/>
      <a href="${url}" style="color:#1a4a1a;font-size:11px;word-break:break-all;">${url}</a>
    </p>
    <p style="margin:12px 0 0;color:#222;font-size:11px;">
      Didn't create an account? You can safely ignore this message.
    </p>
  `);

// ─── 2. Existing Account ─────────────────────────────────────────────────────

export const getExistingAccountTemplate = () =>
  shell(`
    <p style="margin:0 0 4px;color:#ff6b35;font-size:11px;letter-spacing:3px;">SECURITY_ALERT</p>
    <h1 style="margin:0 0 24px;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:2px;">Sign-in attempt detected</h1>

    <p style="margin:0 0 8px;color:#888;font-size:14px;line-height:1.7;">
      Someone tried to register a new account using your email address. If this was you, your account already exists — just sign in.
    </p>

    ${terminalBlock([
      `> EVENT  : DUPLICATE_SIGNUP_ATTEMPT`,
      `> RESULT : BLOCKED`,
      `> ACTION : NO CHANGES MADE`,
    ])}

    ${ctaButton("SIGN IN TO YOUR ACCOUNT", `${BASE_URL}/sign-in`)}

    ${divider()}

    <p style="margin:0;color:#333;font-size:11px;line-height:1.8;">
      Wasn't you? No action needed — your account remains unchanged.<br/>
      If you're concerned, consider updating your password from account settings.
    </p>
  `);

// ─── 3. Subscription Welcome (new subscriber) ────────────────────────────────

export const getWelcomeTemplate = (planName: string, tokensGranted?: number) =>
  shell(`
    <p style="margin:0 0 4px;color:#00ff41;font-size:11px;letter-spacing:3px;">ACCESS_GRANTED</p>
    <h1 style="margin:0 0 24px;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:2px;">Welcome to ${planName}</h1>

    <p style="margin:0 0 8px;color:#888;font-size:14px;line-height:1.7;">
      Your subscription is live. You now have full access to 3CAI's career intelligence tools — resume analysis, interview prep, job match scoring, and more.
    </p>

    ${terminalBlock([
      `> PLAN     : ${planName.toUpperCase()}`,
      tokensGranted ? `> TOKENS   : ${tokensGranted.toLocaleString()} GRANTED` : "",
      `> BILLING  : MONTHLY_CYCLE`,
      `> STATUS   : ACTIVE`,
    ].filter(Boolean))}

    ${ctaButton("OPEN DASHBOARD", `${BASE_URL}/workspace`)}

    ${divider()}

    <p style="margin:0;color:#333;font-size:11px;line-height:1.8;">
      Questions about your plan?
      <a href="${BASE_URL}/settings/billing" style="color:#2a5a2a;text-decoration:none;">View billing details</a>
      or reply to this email.
    </p>
  `);

// ─── 4. Subscription Updated (upgrade / downgrade) ───────────────────────────

export const getUpdateTemplate = (previousPlan: string, newPlan: string, tokensGranted?: number) =>
  shell(`
    <p style="margin:0 0 4px;color:#00aaff;font-size:11px;letter-spacing:3px;">SUBSCRIPTION_UPDATED</p>
    <h1 style="margin:0 0 24px;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:2px;">Plan changed to ${newPlan}</h1>

    <p style="margin:0 0 8px;color:#888;font-size:14px;line-height:1.7;">
      Your subscription has been updated. The new plan is effective immediately and your token balance has been refreshed.
    </p>

    ${terminalBlock([
      `> PREVIOUS : ${previousPlan.toUpperCase()}`,
      `> CURRENT  : ${newPlan.toUpperCase()}`,
      tokensGranted ? `> TOKENS   : ${tokensGranted.toLocaleString()} GRANTED` : "",
      `> EFFECTIVE: IMMEDIATELY`,
    ].filter(Boolean))}

    ${ctaButton("VIEW UPDATED PLAN", `${BASE_URL}/settings/billing`)}

    ${divider()}

    <p style="margin:0;color:#333;font-size:11px;line-height:1.8;">
      Didn't request this change?
      <a href="${BASE_URL}/settings/billing" style="color:#2a4a5a;text-decoration:none;">Review your billing</a>
      or contact support immediately.
    </p>
  `);

// ─── 5. Subscription Cancelled ───────────────────────────────────────────────

export const getCancellationTemplate = (planName: string, accessUntil?: Date) =>
  shell(`
    <p style="margin:0 0 4px;color:#ff4444;font-size:11px;letter-spacing:3px;">SUBSCRIPTION_CANCELLED</p>
    <h1 style="margin:0 0 24px;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:2px;">Your ${planName} plan has been cancelled</h1>

    <p style="margin:0 0 8px;color:#888;font-size:14px;line-height:1.7;">
      We're sorry to see you go. Your cancellation has been processed and you won't be charged again.
      ${accessUntil
        ? `You'll retain full access until <strong style="color:#e0e0e0;">${accessUntil.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</strong>.`
        : "Your access will end at the close of the current billing period."
      }
    </p>

    ${terminalBlock([
      `> PLAN       : ${planName.toUpperCase()}`,
      `> STATUS     : CANCELLED`,
      accessUntil ? `> ACCESS_END : ${accessUntil.toISOString().split("T")[0]}` : `> ACCESS_END : END_OF_BILLING_PERIOD`,
      `> AUTO_RENEW : DISABLED`,
    ])}

    ${ctaButton("REACTIVATE SUBSCRIPTION", `${BASE_URL}/pricing`)}

    ${divider()}

    <p style="margin:0;color:#333;font-size:11px;line-height:1.8;">
      Changed your mind? You can reactivate any time from the pricing page.<br/>
      Your data will be retained for 30 days after access ends.
    </p>
  `);

// ─── 6. Password Reset (bonus) ───────────────────────────────────────────────

export const getPasswordResetTemplate = (url: string) =>
  shell(`
    <p style="margin:0 0 4px;color:#ffaa00;font-size:11px;letter-spacing:3px;">AUTH_RESET</p>
    <h1 style="margin:0 0 24px;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:2px;">Reset your password</h1>

    <p style="margin:0 0 8px;color:#888;font-size:14px;line-height:1.7;">
      A password reset was requested for your 3CAI account. Click below to set a new password. This link expires in 1 hour.
    </p>

    ${terminalBlock([
      `> ACTION  : PASSWORD_RESET`,
      `> EXPIRES : 1 hour`,
      `> STATUS  : PENDING`,
    ])}

    ${ctaButton("RESET PASSWORD", url)}

    ${divider()}

    <p style="margin:0;color:#333;font-size:11px;line-height:1.8;">
      Didn't request a reset? Ignore this email — your password remains unchanged.<br/>
      If you're seeing unexpected activity, contact support.
    </p>
  `);