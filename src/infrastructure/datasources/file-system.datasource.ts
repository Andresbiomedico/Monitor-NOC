import fs from 'fs';
import { LogDataSource } from "../../domain/datasources/log.datasourse";
import { LogSeverityLevel, LogEntity } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDataSource {
    private readonly logPath: string = 'logs/';
    private readonly allLogsPath: string = 'logs/log-all.log';
    private readonly mediumLogsPath: string = 'logs/log-medium.log';
    private readonly highLogsPath: string = 'logs/log-hight.log';

    constructor() {
        this.createLogsFile()
    }
    private createLogsFile = () => {
        if (!fs.existsSync(this.logPath)) {
          console.log('cree la carpeta')
            fs.mkdirSync(this.logPath);
        }

        [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(path => {
            if (fs.existsSync(path)) return
            fs.writeFileSync(path, '');

        });
    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf8');
        if (content === '') return [];
        const Logs = content.split('\n').map(LogEntity.fromJson);
        return Logs;

    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      switch (severityLevel) {
        case LogSeverityLevel.low:
          return this.getLogsFromFile(this.allLogsPath);

        case LogSeverityLevel.medium:
          return this.getLogsFromFile(this.mediumLogsPath);

        case LogSeverityLevel.high:
          return this.getLogsFromFile(this.highLogsPath);

        default:
            throw new Error(`${severityLevel} not implemented`);
      }  
    }
    async saveLog(newLog: LogEntity): Promise<void> {
        const logJson = `${JSON.stringify(newLog)}\n`;
        fs.appendFileSync(this.allLogsPath, logJson );

        if (newLog.level === LogSeverityLevel.low) return

        if (newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logJson);
            return 
        }
        fs.appendFileSync(this.highLogsPath, logJson); 
    }
 
}