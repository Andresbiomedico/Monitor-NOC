
import { Prisma, PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasourse";
import { LogSeverityLevel, LogEntity } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

const severityEnum = {
    low:SeverityLevel.LOW,
    medium:SeverityLevel.MEDIUM,
    high:SeverityLevel.HIGH
}
export class PrismaLogDatasource  implements LogDataSource{
    
    
    async saveLog(log: LogEntity): Promise<void> {
        const level = severityEnum[log.level];
        const newLog = await prismaClient.logModel.create({
            data:{
                ...log,
                level:level
            }
        });
        console.log('prisma Log created', newLog);  
    };
    
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel];
        const logs = await prismaClient.logModel.findMany({
            where:{
                level:level
            }
        });
        return logs.map(LogEntity.fromObject);
    }

}