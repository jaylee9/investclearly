import * as sgMail from '@sendgrid/mail';
import { MailConfig, TemplatesIds } from '../../config/mail-config';
import { UserInterface } from '../users/interfaces/user.interface';

export const sendResetPasswordEmail = async (
  user: UserInterface,
  resetPasswordToken: string
) => {
  sgMail.setApiKey(MailConfig.sendgridApiKey);

  const mailData = {
    to: user.email,
    from: {
      email: MailConfig.sendFrom,
      name: MailConfig.sendFromName,
    },
    template_id: TemplatesIds.resetPasswordEmail,
    dynamic_template_data: {
      frontendUrl: MailConfig.frontendUrl,
      resetPasswordToken,
    },
  };

  return sgMail.send(mailData);
};
