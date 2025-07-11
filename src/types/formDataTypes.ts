export interface RegisterData {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string,
}

export interface LoginData {
    email: string,
    password: string,
}