import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import { IEmailProvider } from '../IEmailProvider';
import { IEmailProviderSendEmailDTO } from '../IEmailProviderSendEmailDTO';

@injectable()
class EtherealEmailProvider implements IEmailProvider {
  private client: Transporter;
  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch((err) => console.log(err));
  }

  async sendEmail({
    to,
    subject,
    variables,
    path,
  }: IEmailProviderSendEmailDTO): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: 'Rental <noreplay@rental.com>',
      subject,
      html: templateHTML,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL:%s', nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealEmailProvider };
