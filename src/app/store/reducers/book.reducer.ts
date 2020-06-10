import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {Book, BookState} from '../books.model';
import * as bookActions from '../actions/book.actions';

export const bookFeatureKey = 'books';
const bookAdapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const initialState: BookState = bookAdapter.getInitialState();

export const bookSelector = bookAdapter.getSelectors();

export const bookReducer = createReducer(
  initialState,
  on(
    bookActions.loadBooksSuccess,
    (state, {books}) => bookAdapter.setAll(books, state)
  ),
);

