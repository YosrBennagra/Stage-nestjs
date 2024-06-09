import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../tokenPayload.interface';
import { UserService } from 'src/uses-case/User';
declare const JwtTwoFactorStrategy_base: new (...args: any[]) => any;
export declare class JwtTwoFactorStrategy extends JwtTwoFactorStrategy_base {
    private readonly configService;
    private readonly userService;
    constructor(configService: ConfigService, userService: UserService);
    validate(payload: TokenPayload): Promise<import("../../../Schema/User.Schema").User>;
}
export {};
