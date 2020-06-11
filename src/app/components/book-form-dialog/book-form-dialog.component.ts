import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Book} from '../../store/books.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export interface ButtonConfig {
  canCancel: boolean;
  canDelete: boolean;
  canSave: boolean;
  canUpdate: boolean;
}

@Component({
  selector: 'app-book-form-dialog',
  templateUrl: './book-form-dialog.component.html',
  styleUrls: ['./book-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFormDialogComponent implements OnInit, OnChanges {

  public bookForm: FormGroup;
  @Input() book: Book = null;
  @Input() header: string = null;
  @Input() buttonConfig = {
    canCancel: false,
    canDelete: false,
    canSave: false,
    canUpdate: false
  };
  @Output() createNewBook: EventEmitter<any> = new EventEmitter<Book>();
  @Output() updateBook: EventEmitter<any> = new EventEmitter<Book>();
  @Output() deleteBook: EventEmitter<any> = new EventEmitter<Book>();
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.book) {
      const {title, author, description} = changes.book.currentValue;
      this.bookForm = this.fb.group({
        title: [title, Validators.required],
        author: [author, Validators.required],
        description
      });
    } else {
      this.bookForm = this.fb.group({
        title: ['', Validators.required],
        author: ['', Validators.required],
        description: ''
      });
    }
  }

  createNewRecord() {
    this.createNewBook.emit(this.bookForm.value);
    this.bookForm.setValue({
      title: '',
      author: '',
      description: ''
    });
  }

  updateBookRecord() {
    console.log(this.bookForm.valid);
    this.updateBook.emit({ ...this.bookForm.value, id: this.book.id});
  }

  deleteBookRecord() {
    this.deleteBook.emit(this.book.id);
  }

  onCancel() {
    this.cancel.emit();
  }
}
