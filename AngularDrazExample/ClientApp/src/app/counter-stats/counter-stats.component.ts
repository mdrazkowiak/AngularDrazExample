import { Component, OnInit } from '@angular/core';
import { GateService } from '../services/gates/gate.service';
import { AppProject } from '../home/project.model';
import { AppManagerService } from '../services/appmanager.service';
import { NotyficationItem } from '../shared/sharedclasses.model';

@Component({
  selector: 'app-counter-stats-component',
  templateUrl: './counter-stats.component.html'
})
export class CounterStatsComponent implements OnInit {
  projectItem: AppProject;

  constructor(private gate: GateService, private appManagerService: AppManagerService) {

  }
  ngOnInit() {
    this.gate.GetProject().subscribe((response: any) => {
      if (response != null && response.ErrorMessage != null && response.ErrorMessage != '') {
        this.appManagerService.signalNewNotyficationChanged(new NotyficationItem(response.ErrorMessage, 'error'));
      }
      else if (response != null && response.Data != null) {
        this.projectItem = response.Data;
      }
      else {
        this.appManagerService.signalNewNotyficationChanged(new NotyficationItem('Server error.', 'error'));
      }
    });
  }
}
