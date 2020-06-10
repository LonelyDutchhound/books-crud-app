import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooklistContainerComponent } from './booklist-container.component';

describe('BooklistContainerComponent', () => {
  let component: BooklistContainerComponent;
  let fixture: ComponentFixture<BooklistContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooklistContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooklistContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
