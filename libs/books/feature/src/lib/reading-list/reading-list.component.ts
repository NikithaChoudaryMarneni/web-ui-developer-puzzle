import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { Book, ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private snackBar: MatSnackBar) {}

  trackReadingListItem = (index: number, list: ReadingListItem) => index;
  
  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    this.actionConfirmation(
      'Removing from reading list ' + item.title,
      this.addBookToReadingList,
      item
    )
  }

  actionConfirmation(msg, func, data) {
    const snackBarRef = this.snackBar.open(msg, 'Undo');
    snackBarRef.onAction().subscribe(() => {
      func(data);
    });
  }

  addBookToReadingList = (book: Book) => {
    this.store.dispatch(addToReadingList({ book }));
  }
  
}
