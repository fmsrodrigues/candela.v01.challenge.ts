import { Injectable } from '@nestjs/common'
import { PdfReader } from 'pdfreader'

@Injectable()
export class InvoiceReaderService {
  private pdfreader: PdfReader

  constructor() {
    this.pdfreader = new PdfReader({})
  }

  async readInvoice(filepath: string) {
    this.pdfreader.parseFileItems(filepath, (err, item) => {
      if (err) {
        console.error(err)
        return
      }

      if (!item) {
        console.error('No item')
        return
      }

      if (item.text) {
        console.log(item.text)
      }
    })
  }
}
