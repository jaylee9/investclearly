import * as sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/mail';
import { MailConfig, TemplatesIds } from '../../config/mail-config';
import { UserInterface } from '../users/interfaces/user.interface';

export const sendResetPasswordEmail = async (
  user: UserInterface,
  resetPasswordToken: string
) => {
  sgMail.setApiKey(MailConfig.sendgridApiKey);

  const mailData: MailDataRequired = {
    to: { email: user.email },
    from: { email: MailConfig.sendFrom, name: MailConfig.sendFromName },
    templateId: TemplatesIds.resetPasswordEmail,
    dynamicTemplateData: {
      frontendUrl: MailConfig.frontendUrl,
      resetPasswordToken,
    },
  };

  return sgMail.send(mailData);
};
