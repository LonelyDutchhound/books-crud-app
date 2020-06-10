import {createFeatureSelector, createSelector} from '@ngrx/store';
import {bookFeatureKey, bookSelector} from '../reducers/book.reducer';
import {BookState} from '../books.model';

export const bookState = createFeatureSelector<BookState>(bookFeatureKey);

export const selectAllBooks = createSelector(
  bookState,
  bookSelector.selectAll
);

// export const selectIsLoaded = (state: State) => state.isLoaded;


