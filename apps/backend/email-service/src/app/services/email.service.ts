import { sendEmail as sharedSendEmail } from '@shared/email';
import { logger } from '@shared/logger';

interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

export const emailService = {
  /**
   * Send an email using the shared email utility.
   * Validates input and logs success or error.
   */
  send: async ({ to, subject, html }: EmailParams) => {
    if (!to || !subject || !html) {
      logger.warn('[emailService] ⚠️ Missing email parameters:', {
        to,
        subject,
        html,
      });
      throw new Error('Missing required email parameters');
    }

    try {
      const result = await sharedSendEmail({ to, subject, html });

      logger.info(
        `[emailService] ✅ Email sent to "${to}", messageId: ${
          result?.messageId ?? 'N/A'
        }`
      );
      return result;
    } catch (error) {
      logger.error('[emailService] ❌ Failed to send email:', {
        to,
        subject,
        error,
      });
      throw error;
    }
  },
};
