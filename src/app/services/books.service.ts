import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from '../store/books.model';
import {Observable} from 'rxjs';

const BaseUrl = 'http://localhost/books';
const Config = {responseType: 'json' as const};

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private httpClient: HttpClient) {
  }

  getBooks(): Observable<any> {
    return this.httpClient.get(BaseUrl, Config);
  }

  createBook(newBook: Book) {
    return this.httpClient.post(BaseUrl, {book: newBook});
  }

  updateBook(id: string, updatedBook: Book) {
    return this.httpClient.put(BaseUrl, {id, book: updatedBook});
  }

  deleteBook(id: string) {
    return this.httpClient.delete(`${BaseUrl}/${id}`);
  }
}
