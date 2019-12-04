import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '@progress/kendo-angular-notification';

import { NotyficationItem } from './shared/sharedclasses.model';
import { AppManagerService } from './services/appmanager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnDestroy {
  title = 'AngularDrazExample';

  newNotyficationSubscription: Subscription;

  constructor(private appManagerService: AppManagerService, private notificationService: NotificationService) {

    this.newNotyficationSubscription = this.appManagerService.newNotyficationChanged$.subscribe(
      msg => {
        this.showNotification(msg);
      }
    );
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.newNotyficationSubscription.unsubscribe();
  }

  private showNotification(msg: NotyficationItem): void {
    this.notificationService.show({
      content: msg.text,
      cssClass: 'app-notification',
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 600 },
      type: { style: msg.type === 'error' ? 'error' : 'success', icon: true },
     // closable: msg.type === 'error' ? true : false,
      hideAfter: 5000
    });
  }
}
