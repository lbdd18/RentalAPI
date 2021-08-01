import { IEmailProviderSendEmailDTO } from './IEmailProviderSendEmailDTO';

interface IEmailProvider {
  sendEmail(data: IEmailProviderSendEmailDTO): Promise<void>;
}

export { IEmailProvider };
