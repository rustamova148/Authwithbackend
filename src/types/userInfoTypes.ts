export interface UserInfo {
  id: string;
  email: string;
  fullname: string;
}

export interface Role {
  id: string;
  name: string;
}
export interface UserDetailInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: string;
  createdAt: string;
  roles: Role[];
}
