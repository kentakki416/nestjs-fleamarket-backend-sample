import { Injectable } from '@nestjs/common';
import { Book } from './book.model';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  create(book: Book) {
    this.books.push(book);
    return book;
  }
}
