import { TwoFactorAuthenticationService } from 'src/uses-case/Auth/TwoFactorAuthentication/twoFactorAuthentication.service';
import { Response } from 'express';
import { UserService } from 'src/uses-case/User/user.service';
import TwoFactorAuthenticationCodeDto from 'src/uses-case/Auth/TwoFactorAuthentication/twoFactorAuthentificationCode.dto';
import { AuthService } from 'src/uses-case/Auth/auth.service';
export declare class TwoFactorAuthenticationController {
    private readonly twoFactorAuthenticationService;
    private readonly usersService;
    private readonly authService;
    constructor(twoFactorAuthenticationService: TwoFactorAuthenticationService, usersService: UserService, authService: AuthService);
    register(response: Response, requestBody: {
        email: string;
        id: string;
    }): Promise<any>;
    authenticate({ twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto, fasecret: string): Promise<{
        isAuthenticated: boolean;
    }>;
    turnOnTwoFactorAuthentication(requestBody: {
        id: string;
    }): Promise<boolean>;
}
