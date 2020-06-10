import {BooksMock} from './books-mock';
import {Book} from '../store/books.model';
import {IDGenerator} from './helpers/idGenerator';

export class MockedDB {
  private booksBaseMock: Book[];
  private bookIDGenerator: IDGenerator;

  constructor() {
    this.booksBaseMock = BooksMock;
    this.bookIDGenerator = new IDGenerator(4);
  }

  findBookRecord(bookID: string) {
    const searchedBook = this.booksBaseMock.find(book => book.id === bookID);
    if (searchedBook) {
      return searchedBook;
    }
  }

  findAllBookRecords() {
    return this.booksBaseMock;
  }

  createBookRecord(book: Book) {
    const createdBook = {
      ...book,
      id: this.bookIDGenerator.generateId()
    };
    this.booksBaseMock = [...this.booksBaseMock, createdBook];
    return createdBook;
  }

  updateBookRecord(bookID: string, params: Book) {
    const updatedBook = this.findBookRecord(bookID);
    if (updatedBook) {
      this.booksBaseMock = this.booksBaseMock.map(book => {
        if (book.id === bookID) {
          return {
            ...book,
            title: params.title,
            author: params.author,
            description: params.description
          };
        }
        return book;
      });
      return updatedBook;
    }
    throw new Error(`No such book was founded in the book base`);
  }

  deleteBookRecord(bookID: string) {
    const deletedBook = this.findBookRecord(bookID);
    if (deletedBook) {
      this.booksBaseMock = this.booksBaseMock.filter(book => book.id !== bookID);
      return deletedBook;
    }
    throw new Error(`No such book was founded in the book base`);
  }
}
