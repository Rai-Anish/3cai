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