import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotyficationItem } from '../shared/sharedclasses.model';

@Injectable()
export class AppManagerService {
  constructor() {
  }

  // przekazywanie komunikatow miedzy kontrolkami (np. bledow)
  private newNotyficationSource = new Subject<NotyficationItem>();
  newNotyficationChanged$ = this.newNotyficationSource.asObservable();
  signalNewNotyficationChanged(msg: NotyficationItem) {
    this.newNotyficationSource.next(msg);
  }
}
