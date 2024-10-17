import { log } from "console";
import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasourse";
import { LogSeverityLevel, LogEntity } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDataSource {

    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        console.log('Mongo Log created', newLog.id);
    };
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: severityLevel
        });
        return logs.map(LogEntity.fromObject);
    }


}