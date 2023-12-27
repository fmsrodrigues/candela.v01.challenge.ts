import { Controller, Get, Param } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'

@Controller('/clients/:id/invoices')
export class ListClientInvoicesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@Param('id') id: string) {
    const invoices = await this.prisma.clientInvoice.findMany({
      where: {
        clientId: id,
      },
    })

    return { invoices }
  }
}
