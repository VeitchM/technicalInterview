import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
// import { InjectDataSource } from '@nestjs/typeorm';
// import { DataSource } from 'typeorm';
import { MssqlService } from 'src/mssql/mssql.service';

@Controller('interview')
export class InterviewController {
  constructor(
    // @InjectDataSource()
    // private dataSource: DataSource,
    private connection: MssqlService,
  ) {}

  @Get('order/:orderId')
  async getOrder(@Param('orderId') orderId: number) {
    // Podria definir esta logica en un servicio pero en estas circunstancias no se justificaba

    // Utilizando 2 store procedures como en la entrevista
    // const data = await Promise.all([
    //   this.dataSource
    //     .query('exec getOrderDetailsInfo @orderId = @0 ', [orderId])
    //     .catch((e) => {
    //       console.log(e);
    //       throw new NotFoundException();
    //     }),
    //   this.dataSource
    //     .query('exec getOrderCustomerInfo @orderId = @0 ', [orderId])
    //     .catch((e) => {
    //       console.log(e);
    //       throw new NotFoundException();
    //     }),
    // ]);

    //Typeorm no soporta multiples recordSets
    //Por eso tuve que crear el modulo mssql para trabajar con el driver directamente
    const data = await this.connection
      .query('exec getOrderInfo @orderId = @0 ', [orderId])
      .catch((e) => {
        console.log(e);
        throw new NotFoundException();
      });

    console.log(data, data[1]);

    if (!data.recordsets[0].length) throw new NotFoundException();

    return {
      customer: data.recordsets[0][0],

      products: data.recordsets[1],
    };

  }
}
