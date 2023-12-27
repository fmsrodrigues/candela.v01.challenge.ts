import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { FileInterceptor } from '@nestjs/platform-express'
import type { Express } from 'express'
import path from 'path'
import crypto from 'node:crypto'
import { diskStorage } from 'multer'
import { InvoiceReaderService } from '@/services/invoice-reader.service'

@Controller('/invoices/upload')
export class UploadClientInvoiceController {
  constructor(
    private prisma: PrismaService,
    private invoiceReader: InvoiceReaderService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('invoice', {
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(pdf)$/)) {
          return cb(new Error('Only PDF files are allowed!'), false)
        }
        cb(null, true)
      },
      storage: diskStorage({
        destination(req, file, cb) {
          cb(null, path.join(__dirname, '..', '..', 'invoices'))
        },
        filename(req, file, cb) {
          const random = crypto.randomBytes(8).toString('hex')
          const filename = Buffer.from(file.originalname).toString('base64')

          cb(null, `${random}-${filename}.pdf`)
        },
      }),
    }),
  )
  async handle(@UploadedFile() file: Express.Multer.File) {
    const filepath = path.join(file.destination, file.filename)
    await this.invoiceReader.readInvoice(filepath)
  }
}
