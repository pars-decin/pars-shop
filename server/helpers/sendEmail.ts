import sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';

export function sendEmail({
  to,
  subject,
  html,
  attachments,
}: Partial<MailDataRequired>) {
  //@ts-ignore
  // TODO: extract vercel vars to env vars. now the vars are global and not only for the specific project
  sgMail.setApiKey(process.env.SG_API_KEY);

  return sgMail.send({
    to,
    from: `eshop@pars-shop.cz`,
    subject,
    html,
    attachments,
  });
}
