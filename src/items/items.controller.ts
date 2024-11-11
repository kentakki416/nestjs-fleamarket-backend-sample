import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service'
import { Item } from '@prisma/client'
import { CreateItemDTO } from './dto/create-item.dto'
import { AuthGuard } from '@nestjs/passport'
import { Request as ExpressRequest } from 'express'
import type { RequestUser } from '../types/reqeustUser'

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
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() CreateItemDTO: CreateItemDTO,
    @Request() req: ExpressRequest &  {user: RequestUser},
  ): Promise<Item> {
    return await this.itemsService.create(CreateItemDTO, req.user.id)
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateStatus(@Param('id', ParseUUIDPipe) id: string) {
    return await this.itemsService.updateStauts(id)
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: ExpressRequest & {user:RequestUser}
  ) {
    return await this.itemsService.delete(id, req.user.id)
  }
}
