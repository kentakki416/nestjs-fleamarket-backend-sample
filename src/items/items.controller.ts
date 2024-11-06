import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ItemsService } from './items.service'
import { Item } from '@prisma/client'
import { CreateItemDTO } from './dto/create-item.dto'

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll() {
    return await this.itemsService.findAll()
  }

  @Get(':id') // items/1(id)
  async findById(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return await this.itemsService.findById(id)
  }

  @Post()
  async create(
    @Body() CreateItemDTO: CreateItemDTO
  ): Promise<Item> {
    return await this.itemsService.create(CreateItemDTO)
  }

  @Put(':id')
  async updateStatus(@Param('id', ParseUUIDPipe) id: string) {
    return await this.itemsService.updateStauts(id)
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.itemsService.delete(id)
  }
}
