import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ItemsService } from './items.service'
import type { Item } from './items.model'
import { CreateItemDTO } from './dto/create-item.dto'

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll() {
    return this.itemsService.findAll()
  }

  @Get(':id') // items/1(id)
  findById(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.itemsService.findById(id)
  }

  @Post()
  create(
    @Body() CreateItemDTO: CreateItemDTO
  ): Item {
    return this.itemsService.create(CreateItemDTO)
  }

  @Put(':id')
  updateStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.itemsService.updateStauts(id)
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.itemsService.delete(id)
  }
}
