import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InterviewModule } from './interview/interview.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MssqlModule } from './mssql/mssql.module';

@Module({
  imports: [
    InterviewModule,


    // Fue usado asi en la entrevista, paso a usarse a un
    // modulo mas bajo nivel mssql module para poder recibir multiples recordSets.
    // TypeOrmModule.forRoot({
    //   type: 'mssql',
    //   host: 'localhost',
    //   port: 1433,
    //   username: 'sa',
    //   password: 'Schwarz3negger!',
    //   database: 'interview',
    //   options: {
    //     encrypt: true,
    //     trustServerCertificate: true,
    //   },

    // }),

    MssqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
