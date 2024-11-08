import exp from "constants"
import { envs } from "./envs.plugin"

describe('envs plugin', () => {

    test('should return env options', () => {        
         expect(envs).toEqual({
            PORT: 3000,
            MAIL_SERVICE: 'gmail',
            MAILER_EMAIL: 'andresbiomedic@gmail.com',
            MAILER_SECRET_KEY: '123456',
            PROD: true,
            MONGO_URL: 'mongodb://andres:123456789@localhost:27017/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'andres',
            MONGO_PASS: '123456789',
            POSTGRES_URL: 'postgresql://postgres:123456789@localhost:5432/NOC-TEST',
            POSTGRES_USER: 'postgres',
            POSTGRES_DB: 'NOC-TEST',
            POSTGRES_PASSWORD: '123456789'
          });                 
    });

    test('should return error if not found env',async () => {
        jest.resetModules();
        process.env.PORT = 'ABC';
        try {
            await import('./envs.plugin');
            expect(true).toBe(false);

        } catch (error) {
            expect(`${error}`).toContain('should be a valid integer');
        }
    })

})