
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from "../../repository/log.repository";
import { basename } from 'path';

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}
type SuccessCallBack = () => void;
type ErrorCallBack = (error: string) => void;
export class CheckService implements CheckServiceUseCase {

  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallBack: SuccessCallBack,
    private readonly errorCallBack: ErrorCallBack
  ) { }


  async execute(url: string): Promise<boolean> {
    const className = basename(__filename);
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      const log = new LogEntity({
        message:`url: ${url} is ok`, 
        level:LogSeverityLevel.low,
        origin:className
      });
      this.logRepository.saveLog(log);
      this.successCallBack();
      return true
    } catch (error) {
      const errorMessage = `${url} is not ok error: ${error}`
      const log = new LogEntity({message:errorMessage, level:LogSeverityLevel.high,origin:className});
      this.logRepository.saveLog(log);
      this.errorCallBack(errorMessage);
      return false
    }
  }
}