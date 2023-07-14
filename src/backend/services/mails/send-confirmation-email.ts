import * as sgMail from '@sendgrid/mail';
import { MailConfig, TemplatesIds } from '../../config/mail-config';
import { UserInterface } from '../users/interfaces/user.interface';

export const sendConfirmationEmail = async (user: UserInterface, confirmationCode: string) => {
  sgMail.setApiKey(MailConfig.sendgridApiKey);

  const mailData = {
    to: user.email,
    from: {
      email: MailConfig.sendFrom,
      name: MailConfig.sendFromName,
    },
    template_id: TemplatesIds.confirmEmail,
    dynamic_template_data: {
      backendUrl: MailConfig.backendUrl,
      confirmationCode: confirmationCode,
    },
  };

  return sgMail.send(mailData as any);
}
