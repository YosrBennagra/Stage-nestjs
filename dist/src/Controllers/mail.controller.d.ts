import EmailService from 'src/uses-case/email/email.service';
import { EmailConfirmationService } from 'src/uses-case/Auth/EmailConfirmation/emailConfirmation.service';
export declare class MailController {
    private readonly emailConfirmationService;
    private readonly mailService;
    constructor(emailConfirmationService: EmailConfirmationService, mailService: EmailService);
    sendMail(sendMailDto: {
        email: string;
        subject: string;
    }): Promise<string>;
}
