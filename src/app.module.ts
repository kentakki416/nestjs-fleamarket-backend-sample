import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [ItemsModule, BooksModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
