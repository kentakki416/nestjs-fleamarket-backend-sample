import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ItemsService } from './items.service'
import type { Item } from './items.model'

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll() {
    return this.itemsService.findAll()
  }

  @Get(':id') // items/1(id)
  findById(@Param('id') id: string) {
    return this.itemsService.findById(id)
  }

  @Post()
  create(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string,
  ): Item {
    const item: Item = {
      id,
      name,
      price,
      description,
      status: 'ON_SALE',
    }
    return this.itemsService.create(item)
  }

  @Put(':id')
  updateStatus(@Param('id') id: string) {
    return this.itemsService.updateStauts(id)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.itemsService.delete(id)
  }
}
