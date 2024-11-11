import { Test } from '@nestjs/testing'
import { ItemsService } from './items.service'
import { PrismaService } from '../prisma/prisma.service'
import { ItemStatus, type Item } from '@prisma/client'
import { NotFoundException } from '@nestjs/common'

// PrismaServiceのmockを作成
const mockPrismaService = {
  item: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  }
}

describe('ItemsService', () => {
  let itemsService: ItemsService
  let prismaService
  beforeEach(async() => {
    // testでもDIを使う
    const module = await Test.createTestingModule({
      providers: [
        ItemsService,
        // PrismaServiceをmockに差し替える
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        }
      ]
    }).compile() // DIの実行

    // DIで作成したインスタンスを取得
    itemsService = module.get<ItemsService>(ItemsService)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  describe('findAll', () => {
    it('正常系', async () => {
      prismaService.item.findMany.mockResolvedValue([])
      const expected = []

      const result = await itemsService.findAll()
      
      expect(result).toEqual(expected)
    })
  })

  describe('findById', () => {
    it('正常系', async () => {
      const item: Item = {
        id: 'test-id',
        name: 'test-item',
        price: 100,
        description: 'test-description',
        status: ItemStatus.ON_SALE,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-o1'),
        userId: '',
      }

      prismaService.item.findUnique.mockResolvedValue(item)

      const result = await itemsService.findById('test-id')

      expect(result).toEqual(item)
      expect(prismaService.item.findUnique).toHaveBeenCalledWith({
        where: {
          id: 'test-id'
        }
      })
    })

    it('異常系: 商品が存在しない', async () => {
      prismaService.item.findUnique.mockResolvedValue(null);

      await expect(itemsService.findById('test-id')).rejects.toThrow(NotFoundException)
    })
  })
})
