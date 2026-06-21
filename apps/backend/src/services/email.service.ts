import { env } from '../config/env.js';
import { getTransporter } from '../lib/mailer.js';
import { logger } from '../utils/logger.js';

// Fire-and-forget notification — failures are logged, never thrown to booking flow.
const sendBookingCreatedEmail = async (toEmail: string, subject: string, text: string) => {
  try {
    const transport = getTransporter();
    await transport.sendMail({
      from: `"Mahjozly" <${env.SMTP_USER}>`,
      to: toEmail,
      subject,
      text,
    });
  } catch (err) {
    logger.error('Failed to send booking email', {
      toEmail,
      message: err instanceof Error ? err.message : String(err),
    });
  }
};

export { sendBookingCreatedEmail };
