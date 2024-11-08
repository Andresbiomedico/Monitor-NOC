import { Server } from "./presentation/server"
import { envs } from './config/plugins/envs.plugin';
import { LogModel, MongoDatabase } from './data/mongo';
import { PrismaClient } from "@prisma/client";



(async () => {
    await main()
})();

async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });
   
    Server.start();
    // console.log(envs)


}   