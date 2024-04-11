import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, updateFromReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}

  trackReadingListItem = (index: number, list: ReadingListItem) => index;
  
  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }
  updateFromReadingList(item) {
    this.store.dispatch(updateFromReadingList({ item: {...item, finished: true, finishedDate: new Date().toISOString()} }));
  }
}
