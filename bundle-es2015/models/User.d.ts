export interface CredentialsProvider {
    type: string;
    name: string;
}
export interface UserCredentials {
    password: string;
    provider: CredentialsProvider;
}
export interface UserStatus {
    suspended: boolean;
    locked: boolean;
    passwordResetRequired: boolean;
}
export interface User {
    id: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    avatarUrl: string;
    timezone: string;
    language: string;
    custom: {
        [key: string]: any;
    };
    credentials: UserCredentials;
    status: UserStatus;
    created: Date;
    modified: Date;
    lastLogin: Date;
    passwordChanged: Date;
}
