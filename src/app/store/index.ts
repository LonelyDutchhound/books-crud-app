import {BookState} from './books.model';
import {bookReducer} from './reducers/book.reducer';
import {BookEffects} from './effects/book.effects';
import {ActionReducerMap} from '@ngrx/store';

export interface State{
  books: BookState;
}

export const reducers: ActionReducerMap<State> = {
  books: bookReducer
};

export const effects = [
  BookEffects
];
