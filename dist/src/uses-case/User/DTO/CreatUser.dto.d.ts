import { Role } from "src/Schema/Enum/Role";
export declare class CreatUserSettings {
    enlignestatut?: boolean;
    statut?: boolean;
}
export declare class CreatUserDto {
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    Role: Role;
    isEmailConfirmed: boolean;
    twoFactorAuthenticationSecret: string;
    isTwoFactorAuthenticationEnabled: boolean;
    passResetToken: string;
}
