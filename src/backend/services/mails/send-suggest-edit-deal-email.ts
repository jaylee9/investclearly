import * as sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/mail';
import { MailConfig, TemplatesIds } from '../../config/mail-config';
import { DealInterface } from '../deals/interfaces/deal.interface';
import { ClaimedRequests } from '../../entities/claimedRequests.entity';

export const sendSuggestEditDealEmail = async (
  deal: DealInterface,
  claimedRequest: ClaimedRequests
) => {
  sgMail.setApiKey(MailConfig.sendgridApiKey);

  const mailData: MailDataRequired = {
    to: { email: MailConfig.supportEmail },
    from: { email: MailConfig.sendFrom, name: MailConfig.sendFromName },
    templateId: TemplatesIds.suggestEdit,
    dynamicTemplateData: {
      dealLegalName: deal.dealLegalName,
      businessEmail: claimedRequest.businessEmail,
      businessPhone: claimedRequest.businessPhone,
      message: claimedRequest.message,
    },
  };

  return sgMail.send(mailData);
};
