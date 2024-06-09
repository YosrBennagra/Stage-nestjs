import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/uses-case/User';
import EmailService from 'src/uses-case/email/email.service';
export declare class EmailConfirmationService {
    private readonly jwtService;
    private readonly configService;
    private readonly emailService;
    private readonly usersService;
    constructor(jwtService: JwtService, configService: ConfigService, emailService: EmailService, usersService: UserService);
    sendVerificationLink(email: string): Promise<any>;
    confirmEmail(email: string): Promise<void>;
    decodeConfirmationToken(token: string): Promise<any>;
    resendConfirmationLink(email: string): Promise<void>;
}
