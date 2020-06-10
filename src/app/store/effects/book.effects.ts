import {Injectable} from '@angular/core';
import {Actions, ofType} from '@ngrx/effects';
import {concatMap, map} from 'rxjs/operators';
import {createEffect} from '@ngrx/effects';
import {BooksService} from '../../services/books.service';
import {Book} from '../books.model';
import * as BookActions from '../actions/book.actions';


@Injectable()
export class BookEffects {

  createBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.createBook),
      concatMap((action) => this.createBook(action.book)),
      map((_) => BookActions.loadBooks())
    )
  );

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.loadBooks),
      concatMap(() => this.loadBooks()),
      map((books: Book[]) => BookActions.loadBooksSuccess({books}))
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.editBook),
      concatMap((action) => this.updateBook(action.update.id, action.update.changes)),
      map((_) => BookActions.loadBooks())
    )
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.deleteBook),
      concatMap((action) => this.deleteBook(action.id)),
      map((_) => BookActions.loadBooks())
    )
  );

  constructor(private actions$: Actions,
              private booksService: BooksService) {
  }

  private createBook(book) {
    return this.booksService.createBook(book);
  }

  private loadBooks() {
    return this.booksService.getBooks();
  }

  private updateBook(id, book) {
    return this.booksService.updateBook(id, book);
  }

  private deleteBook(id) {
    return this.booksService.deleteBook(id);
  }
}
