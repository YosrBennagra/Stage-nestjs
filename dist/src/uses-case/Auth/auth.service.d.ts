import { UserService } from '../User';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private userService;
    private jwtService;
    private readonly configService;
    constructor(userService: UserService, jwtService: JwtService, configService: ConfigService);
    signIn(email: string, pass: string): Promise<{
        access_token: string;
        user: any;
        userId: string;
        useremail: string;
        username: string;
        faSecret: string;
        isTwoFactorAuthenticationEnabled: Boolean;
        isEmailConfirmed: Boolean;
        profilePicture: string;
        role: string;
    }>;
    getCookieWithJwtAccessToken(userId: string, isSecondFactorAuthenticated?: boolean): string;
    getCookieWithJwtRefreshToken(userId: string): {
        cookie: string;
        token: string;
    };
}
