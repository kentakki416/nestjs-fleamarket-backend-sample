import { Injectable } from '@nestjs/common';
import type { Item } from './items.model'

@Injectable()
export class ItemsService {
  private items: Item[] = []

  findAll() {
    return this.items
  }

  findById(id: string) {
    return this.items.find((item) => item.id === id)
  }

  create(item: Item) {
    this.items.push(item)
    return item
  }

  updateStauts(id: string): Item {
    const item = this.findById(id)
    item.status = 'SOLD_OUT'
    return item
  }

  delete(id: string) {
    this.items = this.items.filter((item) => item.id !== id)
  }
}
