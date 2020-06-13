import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {Book} from '../../store/books.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {createBook, deleteBook, editBook} from '../../store/actions/book.actions';

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
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() notifyUpdateBook: EventEmitter<any> = new EventEmitter<any>();


  constructor(private fb: FormBuilder,
              private store: Store) { }

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

  createBook() {
    this.store.dispatch(createBook({book: this.bookForm.value}));
    this.bookForm.setValue({
      title: '',
      author: '',
      description: ''
    });
    this.bookForm.markAsUntouched();
  }

  updateBook() {
    const update = {
      id: this.book.id,
      changes: this.bookForm.value
    };
    this.store.dispatch(editBook({update}));
    this.notifyUpdateBook.emit();
  }

  deleteBook() {
    this.store.dispatch(deleteBook({id: this.book.id}));
  }

  onCancel() {
    this.cancel.emit();
  }

  isControlValid(controlName) {
    return !this.bookForm.controls[controlName].valid && this.bookForm.controls[controlName].touched;
  }
}
