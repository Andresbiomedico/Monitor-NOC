import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
export abstract class LogDataSource {
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
    abstract saveLog(log:LogEntity):Promise<void>;
}   