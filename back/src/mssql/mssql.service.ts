import { Injectable } from '@nestjs/common';
import * as mssqlDriver from 'mssql';
import { constants } from 'src/constants';

@Injectable()
export class MssqlService {
  private connection: mssqlDriver.ConnectionPool;

  async onModuleInit() {
    this.connection = await mssqlDriver.connect({
      ...constants.database,
      options: { trustServerCertificate: true },
    });
  }

  async query(query: string, params?: any[]) {
    const request = this.connection.request();
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          request.input(key, params[key]);
        }
      }
    }
    return await request.query(query);
  }
}
