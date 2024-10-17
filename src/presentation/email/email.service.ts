import { LogEntity, LogSeverityLevel } from './../../domain/entities/log.entity';
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';

interface SendEmailOptions {
    to: string | string [];
    subject: string;
    htmlBody: string;
    attachments?: Attachement[]
}
interface Attachement{
    filename:string;
    path:string
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAIL_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY

        }
    });

    constructor(){}
    async sendEmail(options: SendEmailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments=[] } = options
        try {
            const sentInformation = await  this.transporter.sendMail({
                to:to,
                subject:subject,
                html:htmlBody,
                attachments:attachments
            })
            return true;
        } catch (error) {
            return false;
        }

    }

    sendEmailWithSystemLogs(to: string | string []) :Promise<boolean>{
        const subject  = ' logs del servidor';
        const htmlBody = `
        <h3>Logs de sitema -NOC </h3>
        <p>lorenm velit non s</p>
        <p>ver logs adjuntos</p>
      `;
        const attachments : Attachement[]= [
            {
                filename:'log-all.log',
                path:'./logs/log-all.log'
            }, 
            {
                filename:'log-hight.log',
                path:'./logs/log-hight.log'
            }, 
            {
                filename:'log-medium.log',
                path:'./logs/log-medium.log'
            } 
        ]

       return  this.sendEmail({
            to,subject,htmlBody,attachments
        })
    }
}