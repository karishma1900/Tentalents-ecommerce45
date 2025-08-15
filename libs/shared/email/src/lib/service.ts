import { sendEmail } from '@shared/email/src/index';
import { EmailPayload } from '@shared/email/src/index';

export const sendEmailService = async (data: EmailPayload) => {
  await sendEmail(data);
};
