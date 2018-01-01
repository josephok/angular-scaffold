export interface User {
  id: string;
  token: string;
}

export interface NewUser {
  username: string;
  password: string;
  confirmPass: string;
}
