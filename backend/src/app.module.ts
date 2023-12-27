import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { InvoiceReaderService } from './services/invoice-reader.service'
import { ListClientsController } from './controllers/list-clients.controller'
import { ListClientInvoicesController } from './controllers/list-client-invoices.controller'
import { UploadClientInvoiceController } from './controllers/upload-client-invoice.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [
    ListClientsController,
    ListClientInvoicesController,
    UploadClientInvoiceController,
  ],
  providers: [PrismaService, InvoiceReaderService],
})
export class AppModule {}
