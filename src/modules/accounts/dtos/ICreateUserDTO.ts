interface ICreateUserDTO {
  name: string;
  username: string;
  email: string;
  password: string;
  driver_license: string;
  isAdmin: boolean;
}

export { ICreateUserDTO }