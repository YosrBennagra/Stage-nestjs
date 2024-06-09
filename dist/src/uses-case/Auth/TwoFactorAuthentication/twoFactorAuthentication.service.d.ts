import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/uses-case/User';
import { Response } from 'express';
export declare class TwoFactorAuthenticationService {
    private readonly usersService;
    private readonly configService;
    constructor(usersService: UserService, configService: ConfigService);
    generateTwoFactorAuthenticationSecret(email: string, id: string): Promise<{
        secret: string;
        otpauthUrl: string;
    }>;
    pipeQrCodeStream(stream: Response, otpauthUrl: string): Promise<any>;
    isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, fasecret: string): boolean;
}
