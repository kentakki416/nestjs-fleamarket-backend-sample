import { Injectable, NotFoundException } from '@nestjs/common';
import type { Item } from './items.model'
import type { CreateItemDTO } from './dto/create-item.dto'
import {v4 as uuid} from 'uuid'

@Injectable()
export class ItemsService {
  private items: Item[] = []

  findAll() {
    return this.items
  }

  findById(id: string) {
    const found = this.items.find((item) => item.id === id)
    if (!found) {
      throw new NotFoundException()
    }
    return found
  }

  create(createItemDTO: CreateItemDTO): Item {
    const item: Item = {
      id: uuid(),
      ...createItemDTO,
      status: 'ON_SALE'
    }
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
