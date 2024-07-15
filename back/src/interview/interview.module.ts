import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
// import { DataSource } from 'typeorm';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { MssqlModule } from 'src/mssql/mssql.module';

@Module({
  imports: [MssqlModule],
  providers: [InterviewService],
  controllers: [InterviewController],
})
export class InterviewModule {}
