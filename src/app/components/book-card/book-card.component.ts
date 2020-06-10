import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../store/books.model';
import {ButtonConfig} from '../book-form-dialog/book-form-dialog.component';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  public updateDialogButtonConfig: ButtonConfig = {
    canCancel: true,
    canDelete: true,
    canSave: false,
    canUpdate: true
  };

  @Input() book: Book;
  @Output() updateBook: EventEmitter<any> = new EventEmitter<Book>();
  @Output() deleteBook: EventEmitter<any> = new EventEmitter<string>();
  public isEdited = false;
  public dialogHeader = 'Update book card';

  constructor() { }

  ngOnInit(): void {
  }

  onUpdateBookRecord(book: Book) {
    this.updateBook.emit(book);
    this.onCloseEditingDialog();
  }

  onDeleteBookRecord(bookID: string) {
    this.deleteBook.emit(bookID);
  }

  onCloseEditingDialog() {
    this.isEdited = false;
  }

  openUpdateDialog() {
    this.isEdited = true;
  }
}
