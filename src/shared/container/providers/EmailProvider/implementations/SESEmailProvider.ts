import { SES } from 'aws-sdk';
import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import { IEmailProvider } from '../IEmailProvider';
import { IEmailProviderSendEmailDTO } from '../IEmailProviderSendEmailDTO';

@injectable()
class SESEmailProvider implements IEmailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
      }),
    });
  }

  async sendEmail({
    to,
    subject,
    variables,
    path,
  }: IEmailProviderSendEmailDTO): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');
    const templateParse = handlebars.compile(templateFileContent);
    const templateHtml = templateParse(variables);
    await this.client.sendMail({
      to,
      from: 'Rental <admin@luciano-dias.com>',
      subject,
      html: templateHtml,
    });
  }
}

export { SESEmailProvider };
