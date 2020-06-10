import {Component, OnInit} from '@angular/core';
import {Book} from '../../store/books.model';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {ButtonConfig} from '../book-form-dialog/book-form-dialog.component';
import {createBook, deleteBook, editBook, loadBooks} from '../../store/actions/book.actions';
import {selectAllBooks} from '../../store/selectors/book.selectors';

@Component({
  selector: 'app-booklist-container',
  templateUrl: './booklist-container.component.html',
  styleUrls: ['./booklist-container.component.scss']
})
export class BooklistContainerComponent implements OnInit {

  public books$: Observable<Book[]>;
  public dialogHeader = 'Create new book card';
  public createDialogButtonConfig: ButtonConfig = {
    canCancel: false,
    canDelete: false,
    canSave: true,
    canUpdate: false
  };

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadBooks());
    this.books$ = this.store.select(selectAllBooks);
  }

  onCreateBook(book: Book) {
    this.store.dispatch(createBook({book}));
    this.store.dispatch(loadBooks());
  }

  onUpdateBook(bookUpdate: Book) {
    const update = {
      id: bookUpdate.id,
      changes: bookUpdate
    };
    this.store.dispatch(editBook({update}));
    this.store.dispatch(loadBooks());
  }

  onDeleteBook(id: string) {
    this.store.dispatch(deleteBook({id}));
    this.store.dispatch(loadBooks());
  }
}
