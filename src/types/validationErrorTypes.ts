export interface ValidationErrorResponseLogin {
  Email?: string[];
  Password?: string[];
}

export interface ValidationErrorResponseRegister {
  Email? : string[];
  PhoneNumber?: string[];
  Password?: string[];
  FirstName?: string[];
  LastName?: string[];
  ConfirmPassword?: string[];
}