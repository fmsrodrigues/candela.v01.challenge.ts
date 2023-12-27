import { Controller, Get } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Controller('/clients')
export class ListClientsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle() {
    const clients = await this.prisma.clientInvoice.findMany({
      select: {
        clientId: true,
      },
      distinct: [
        Prisma.ClientInvoiceScalarFieldEnum[
          `${this.prisma.clientInvoice.fields.clientId.name}`
        ],
      ],
    })

    const clientsId = clients.map((client) => client.clientId)

    return { clientsId }
  }
}
