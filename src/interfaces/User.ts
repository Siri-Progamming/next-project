export interface User {
    id: string;
    email: string;
}

export interface UserWithToken extends User{
    token: string;
}
