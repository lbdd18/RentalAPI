interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  driver_license: string;
  is_admin: boolean;
}

export { ICreateUserDTO };
