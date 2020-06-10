import {createAction, props} from '@ngrx/store';
import {Book} from '../books.model';
import {Update} from '@ngrx/entity';

export const loadBooks = createAction(
  '[Book] Load Books'
);

export const loadBooksSuccess = createAction(
  '[Book] Load Books Success',
  props<{ books: Book[] }>()
);

export const createBook = createAction(
  '[Book] create Book',
  props<{ book: Book }>()
);

export const editBook = createAction(
  '[Book] edit Book',
  props<{ update: Update<Book> }>()
);

export const deleteBook = createAction(
  '[Book] delete Book',
  props<{ id: string }>()
);
