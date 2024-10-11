import { CronService } from './cron/cron-service';
import { CheckService } from '../domain/use-cases/checks/checks-service';

export class Server {
  public static start(): void {
    console.log('Server started...');
    
    CronService.crearJob(
      '*/2 * * * * *',
      () => {
        const url = 'https://google.com';
        new CheckService(
          () => console.log(`url: ${url} is ok`),
          (error) => console.log(error)
        ).execute(url);
      });
  }


}