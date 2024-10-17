import { CronService } from './cron/cron-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/datasources/repositories/log.repository.impl';
import { EmailService } from './email/email.service';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PrismaLogDatasource } from '../infrastructure/datasources/prisma-log-datasource';
import { CheckServiceMultiple } from '../domain/use-cases/checks/checks-service-multiple';




const fileSystemlogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
)
const  prismaLogRepository = new LogRepositoryImpl(
  new PrismaLogDatasource()
)
const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDatasource()

)
const emailService = new EmailService();

export class Server {
  public static start(): void {
    //todo: mandar email
    console.log('Server started.....');
    // new SendEmailLogs(fileSystemLogRepository,emailService)
    // .execute(['andresbiomedic@gmail.com','andresbiomedic@gmail.com'])
    
    // emailService.sendEmailWithSystemLogs(['andresbiomedic@gmail.com','andresbiomedic@gmail.com'])

    // emailService.sendEmail({
    //   to: 'andresbiomedic@gmail.com',
    //   subject:'logs de sistema',
    //   htmlBody:`
    //     <h3>Logs de sitema -NOC </h3>
    //     <p>ver logs adjuntos</p>
    //   `
    // })

    //todo: Configurar el croon enviar a un solo datasource
    // CronService.crearJob(
    //   '*/2 * * * * *',
    //   () => {
    //     const url = 'https://google.com';

    //     new CheckService(
    //       logRepository,
    //       () => console.log(`url: ${url} is ok`),
     
    //      (error) => console.log(error)
    //     ).execute(url);
    //   });



    //todo: Configurar el croon enviar a multiple datasource
  //   CronService.crearJob(
  //     '*/2 * * * * *',
  //     () => {
  //       const url = 'https://google.com';

  //       new CheckServiceMultiple(
  //         [prismaLogRepository,mongoLogRepository,fileSystemlogRepository],
  //         () => console.log(`url: ${url} is ok`),
     
  //        (error) => console.log(error)
  //       ).execute(url);
  //     });
  }
}