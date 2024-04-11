import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  getReadingList,
  ReadingListBook,
  removeFromReadingList,
  searchBooks
} from '@tmo/books/data-access';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { distinctUntilChanged, debounceTime, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnDestroy {
  books$: Observable<ReadingListBook[]> = this.store.select(getAllBooks);
  unsubscribe$ = new Subject();
  itemList: ReadingListItem[];
  readingList = this.store.select(getReadingList);
  
  searchForm: FormGroup = this.fb.group({
    term: ''
  });

  constructor(
      private readonly store: Store,
      private readonly fb: FormBuilder,
      private snackBar: MatSnackBar
    ) {
      this.searchForm.controls.term.valueChanges.pipe(
        distinctUntilChanged(), 
        debounceTime(500),
        takeUntil(this.unsubscribe$)
      ).subscribe(() => {
        this.searchBooks();
      });
      this.readingList.subscribe(
        itemList => {
          this.itemList = itemList;
        }
      )
    }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
    this.actionConfirmation(
      'Adding To reading list ' + book.title,
      this.removeFromReadingList,
      this.itemList
    )
  }

  removeFromReadingList = (data:ReadingListItem[]) => {
    const item = data[data.length-1];
    this.store.dispatch(removeFromReadingList({ item }));
  }

  actionConfirmation(msg, func, data) {
    const snackBarRef = this.snackBar.open(msg, 'Undo');
    snackBarRef.onAction().subscribe(() => {
      func(data);
    });
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  trackBook = (index: number, book: Book) => index; 
}