import { AppModule } from '@/app.module''
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('List clients (E2E)', () => {
  let app: INestApplication, prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[GET] /clients', async () => {
    await prisma.clientInvoice.createMany({
      data: [
        {
          clientId: '1',
          invoiceDate: new Date(),
          eletricalEnergyKWH: 1,
          eletricalEnergyPrice: 1,
          eletricalSCEEEWithoutICMSKWH: 1,
          eletricalSCEEEWithoutICMSPrice: 1,
          eletricalCompensatedGDIKWH: 1,
          municipalPublicContributionPrice: 1,
        },
        {
          clientId: '2',
          invoiceDate: new Date(),
          eletricalEnergyKWH: 1,
          eletricalEnergyPrice: 1,
          eletricalSCEEEWithoutICMSKWH: 1,
          eletricalSCEEEWithoutICMSPrice: 1,
          eletricalCompensatedGDIKWH: 1,
          municipalPublicContributionPrice: 1,
        },
        {
          clientId: '3',
          invoiceDate: new Date(),
          eletricalEnergyKWH: 1,
          eletricalEnergyPrice: 1,
          eletricalSCEEEWithoutICMSKWH: 1,
          eletricalSCEEEWithoutICMSPrice: 1,
          eletricalCompensatedGDIKWH: 1,
          municipalPublicContributionPrice: 1,
        },
      ],
    })

    const res = await request(app.getHttpServer()).post('/clients').send()
    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      clientsId: ['1', '2', '3'],
    })
  })
})
