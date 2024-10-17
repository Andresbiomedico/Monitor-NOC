import { EmailService } from '../../../presentation/email/email.service';
import { LogRepository } from '../../repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { basename } from 'path';
interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {
    private className = basename(__filename);
    constructor(
        private readonly logRepository: LogRepository,
        private readonly emailService: EmailService
    ) { }
    async execute(to: string | string[]) {
        try {
            const sent = await this.emailService.sendEmailWithSystemLogs(to);
            if (!sent){
                throw new Error('Email log not sent');
            }
            const log = new LogEntity({
                message: `Log email send`,
                level: LogSeverityLevel.high,
                origin: this.className,
            })
            this.logRepository.saveLog(log)
            return true
        } catch (error) {
            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: this.className,
            })
            this.logRepository.saveLog(log)
            return false;
        }
        

    }

}