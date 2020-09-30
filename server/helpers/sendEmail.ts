import sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';

export function sendEmail({
  to,
  subject,
  html,
  attachments,
}: Partial<MailDataRequired>) {
  sgMail.setApiKey(process.env.SG_API_KEY);

  return sgMail.send({
    to,
    from: `eshop@pars-shop.cz`,
    subject,
    html,
    attachments,
  });
}
