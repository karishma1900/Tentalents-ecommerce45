import { sendEmail } from '@shared/middlewares/email/src/index';
import { EmailPayload } from '@shared/middlewares/email/src/index';

export const sendEmailService = async (data: EmailPayload) => {
  await sendEmail(data);
};
