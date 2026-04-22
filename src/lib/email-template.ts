export const getVerificationTemplate = (url: string) => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      .container { font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 8px; }
      .header { font-size: 24px; font-weight: bold; margin-bottom: 20px; }
      .button { background-color: #000; color: #fff !important; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 20px 0; }
      .footer { font-size: 12px; color: #666; margin-top: 30px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">3CAI</div>
      <p>Please verify your email address to complete your registration and access our career tools.</p>
      <a href="${url}" class="button">Verify Email Address</a>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p style="color: #0066cc; font-size: 12px;">${url}</p>
      <div class="footer">
        If you did not create an account, you can safely ignore this email.
      </div>
    </div>
  </body>
  </html>
`;

export const getExistingAccountTemplate = () => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      .container { font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 8px; }
      .footer { font-size: 12px; color: #666; margin-top: 30px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">3CAI</div>
      <p>Someone tried to create a new account using your email address.</p>
      <p>If this was you, simply <a href="${process.env.BETTER_AUTH_URL}/sign-in">sign in</a> to your existing account instead.</p>
      <p>If this wasn't you, you can safely ignore this email — no changes were made to your account.</p>
      <div class="footer">If you're concerned, consider changing your password.</div>
    </div>
  </body>
  </html>
`;


export const getWelcomeTemplate = (planName: string) => `
  <div style="background-color: #0a0a0a; color: #ffffff; font-family: 'Courier New', Courier, monospace; padding: 40px; border: 1px solid #333;">
    <h1 style="color: #00ff41; border-bottom: 1px solid #333; padding-bottom: 10px;">[ ACCESS_GRANTED ]</h1>
    <p style="font-size: 16px;">Protocol initiated. Your <strong>${planName.toUpperCase()}</strong> plan is now active.</p>
    <div style="background-color: #111; padding: 15px; border-left: 4px solid #00ff41; margin: 20px 0;">
      <p style="margin: 5px 0;">> STATUS: ONLINE</p>
      <p style="margin: 5px 0;">> SECTOR: ${planName.toUpperCase()}_TIER</p>
    </div>
    <p style="color: #888; font-size: 12px;">Head to the dashboard to begin deployment.</p>
  </div>
`;


export const getUpdateTemplate = (newPlan: string) => `
  <div style="background-color: #0a0a0a; color: #ffffff; font-family: 'Courier New', Courier, monospace; padding: 40px; border: 1px solid #333;">
    <h1 style="color: #00ff41; border-bottom: 1px solid #333; padding-bottom: 10px;">[ SUBSCRIPTION_UPDATED ]</h1>
    <p style="font-size: 16px;">Subscription delta detected and applied successfully.</p>
    <div style="background-color: #111; padding: 15px; border-left: 4px solid #00ff41; margin: 20px 0;">
      <p style="margin: 5px 0; color: #00ff41;">+ CURRENT_CORE: ${newPlan.toUpperCase()}</p>
    </div>
    <p style="color: #888; font-size: 12px;">New resource limits have been synced to your wallet.</p>
  </div>
`;