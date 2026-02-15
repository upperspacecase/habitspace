import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Solo <onboarding@resend.dev>";

export async function sendWelcomeEmail(to, habitName, firstTask) {
  if (!resend) {
    console.log(`[Email] Would send welcome email to ${to} for habit: ${habitName}`);
    return { success: true, simulated: true };
  }

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Your Solo journey begins: ${habitName}`,
    html: buildEmail({
      preheader: "One habit. One step at a time.",
      heading: "Welcome to Solo",
      body: `
        <p>You've committed to building <strong>${habitName}</strong>. That takes guts.</p>
        <p>Here's your first micro-task:</p>
        <div style="background: #1a1a2e; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center;">
          <p style="font-size: 20px; font-weight: 600; margin: 0;">${firstTask}</p>
        </div>
        <p>That's it. Just do this one thing today. We'll check in with you daily.</p>
        <p style="opacity: 0.6; font-size: 14px;">Remember: the goal isn't perfection. It's showing up.</p>
      `,
    }),
  });

  if (error) {
    console.error("[Email] Failed to send welcome email:", error);
    return { success: false, error };
  }
  return { success: true, data };
}

export async function sendReminderEmail(to, habitName, task, streak, level) {
  if (!resend) {
    console.log(`[Email] Would send reminder to ${to}: ${task} (streak: ${streak})`);
    return { success: true, simulated: true };
  }

  const streakText = streak > 0
    ? `You're on a ${streak}-day streak. Keep it alive.`
    : "Today's a fresh start. One check-in is all it takes.";

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `${habitName}: ${task}`,
    html: buildEmail({
      preheader: `Level ${level} \u2022 ${streakText}`,
      heading: `Today's task`,
      body: `
        <div style="background: #1a1a2e; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center;">
          <p style="font-size: 20px; font-weight: 600; margin: 0;">${task}</p>
          <p style="font-size: 13px; opacity: 0.5; margin: 8px 0 0 0;">Level ${level} of 5</p>
        </div>
        <p>${streakText}</p>
        <p style="opacity: 0.6; font-size: 14px;">When you're done, open Solo and hit the check-in button.</p>
      `,
    }),
  });

  if (error) {
    console.error("[Email] Failed to send reminder:", error);
    return { success: false, error };
  }
  return { success: true, data };
}

export async function sendLevelUpEmail(to, habitName, newLevel, newTask) {
  if (!resend) {
    console.log(`[Email] Would send level-up to ${to}: Level ${newLevel}`);
    return { success: true, simulated: true };
  }

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Level up! ${habitName} \u2192 Level ${newLevel}`,
    html: buildEmail({
      preheader: "You've proven consistency. Time to grow.",
      heading: `Level ${newLevel} unlocked`,
      body: `
        <p>You crushed Level ${newLevel - 1} of <strong>${habitName}</strong>. Consistency proven.</p>
        <p>Your new daily task:</p>
        <div style="background: #1a1a2e; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center;">
          <p style="font-size: 20px; font-weight: 600; margin: 0;">${newTask}</p>
          <p style="font-size: 13px; opacity: 0.5; margin: 8px 0 0 0;">Level ${newLevel} of 5</p>
        </div>
        <p>Same approach: just show up and do it. You've already proven you can.</p>
      `,
    }),
  });

  if (error) {
    console.error("[Email] Failed to send level-up email:", error);
    return { success: false, error };
  }
  return { success: true, data };
}

export async function sendGraduationEmail(to, habitName, totalDays) {
  if (!resend) {
    console.log(`[Email] Would send graduation to ${to}: ${habitName} completed!`);
    return { success: true, simulated: true };
  }

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `You graduated: ${habitName} is now part of you`,
    html: buildEmail({
      preheader: "One habit conquered. Ready for the next?",
      heading: `${habitName} \u2014 Graduated`,
      body: `
        <div style="text-align: center; font-size: 48px; margin: 20px 0;">
          \u{1F393}
        </div>
        <p><strong>${habitName}</strong> is no longer something you're building. It's something you <em>do</em>.</p>
        <p>You showed up for <strong>${totalDays} days</strong> and worked through all 5 levels. That's rare.</p>
        <p>When you're ready, open Solo to pick your next habit. The stack grows.</p>
        <p style="opacity: 0.6; font-size: 14px;">One at a time. That's how change compounds.</p>
      `,
    }),
  });

  if (error) {
    console.error("[Email] Failed to send graduation email:", error);
    return { success: false, error };
  }
  return { success: true, data };
}

function buildEmail({ preheader, heading, body }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${heading}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0f; color: #f0f0f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <!-- Preheader -->
  <div style="display: none; max-height: 0; overflow: hidden;">${preheader}</div>

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0f;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 480px;">
          <!-- Logo -->
          <tr>
            <td style="padding-bottom: 32px;">
              <span style="font-size: 18px; font-weight: 700; letter-spacing: -0.5px;">
                habit<span style="color: #6c63ff;">space</span>
              </span>
              <span style="font-size: 12px; opacity: 0.4; margin-left: 8px;">solo</span>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td style="padding-bottom: 24px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; line-height: 1.2;">
                ${heading}
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="font-size: 16px; line-height: 1.6; color: #d0d0d8;">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.05); margin-top: 40px;">
              <p style="font-size: 12px; opacity: 0.3; margin: 0;">
                Solo by habitspace \u2022 One habit at a time
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
