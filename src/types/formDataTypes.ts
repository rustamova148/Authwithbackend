export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface VerifyCodeData {
  email: string;
}

export interface SetNewPasswordData {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface editData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
