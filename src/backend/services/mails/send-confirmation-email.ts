import * as sgMail from "@sendgrid/mail";
import { MailConfig, TemplatesIds } from "../../config/mail-config";

interface userData {
  email: string;
};

export const sendConfirmationEmail = async (user: userData, confirmationCode: string) => {
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
