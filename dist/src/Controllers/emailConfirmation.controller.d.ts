import ConfirmEmailDto from 'src/uses-case/Auth/EmailConfirmation/confirmEmail.dto';
import { EmailConfirmationService } from 'src/uses-case/Auth/EmailConfirmation/emailConfirmation.service';
export declare class EmailConfirmationController {
    private readonly emailConfirmationService;
    constructor(emailConfirmationService: EmailConfirmationService);
    confirm(confirmationData: ConfirmEmailDto): Promise<void>;
    resendConfirmationLink(body: {
        email: string;
    }): Promise<void>;
}
