interface IEmailProviderSendEmailDTO {
  to: string;
  subject: string;
  variables: any;
  path: string;
}

export { IEmailProviderSendEmailDTO };
