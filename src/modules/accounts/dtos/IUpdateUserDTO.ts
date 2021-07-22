interface IUpdateUserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  driver_license: string;
  isAdmin: boolean;
  avatar: string;
}

export { IUpdateUserDTO }