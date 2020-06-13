import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Book} from '../../store/books.model';
import {ButtonConfig} from '../book-form-dialog/book-form-dialog.component';
import {Store} from '@ngrx/store';
import {deleteBook} from '../../store/actions/book.actions';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent implements OnInit {
  public updateDialogButtonConfig: ButtonConfig = {
    canCancel: true,
    canDelete: true,
    canSave: false,
    canUpdate: true
  };

  @Input() book: Book;
  public isEdited = false;
  public dialogHeader = 'Update book card';

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  deleteBook() {
    this.store.dispatch(deleteBook({id: this.book.id}));
  }

  onUpdateBook() {
    this.onCloseEditingDialog();
  }

  onCloseEditingDialog() {
    this.isEdited = false;
  }

  openUpdateDialog() {
    this.isEdited = true;
  }
}
