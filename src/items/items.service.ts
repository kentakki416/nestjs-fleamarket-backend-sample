import { Injectable, NotFoundException } from '@nestjs/common';
import { Item, ItemStatus } from '@prisma/client'
import { CreateItemDTO } from './dto/create-item.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.item.findMany()
  }

  async findById(id: string) {
    const found = await this.prismaService.item.findUnique({
      where: {
        id,
      },
    })
    if (!found) {
      throw new NotFoundException()
    }
    return found
  }

  async create(createItemDTO: CreateItemDTO): Promise<Item> {
    const {name, price, description} = createItemDTO
    return await this.prismaService.item.create({
      data: {
        name,
        price,
        description,
        status: ItemStatus.ON_SALE
      }
    })
  }

  async updateStauts(id: string) {
    return await this.prismaService.item.update({
      where: {
        id,
      },
      data: {
        status: ItemStatus.SOLE_OUT
      }
    })
  }

  async delete(id: string) {
    await this.prismaService.item.delete({
      where: {
        id
      }
    })
  }
}
