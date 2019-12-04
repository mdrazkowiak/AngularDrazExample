import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GateService } from '../services/gates/gate.service';
import { AppManagerService } from '../services/appmanager.service';
import { NotyficationItem, ComboItem } from '../shared/sharedclasses.model';
import { AppProject } from '../home/project.model';

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html'
})
export class ProjectPreviewComponent implements OnInit {
  projectItem: AppProject;
  fontItems: ComboItem[] = [];

  constructor(private gate: GateService, private appManagerService: AppManagerService) {

  }

  ngOnInit() {
    this.gate.FontsListGet().subscribe((response: any) => {
      if (response != null && response.ErrorMessage != null && response.ErrorMessage != '') {
        this.appManagerService.signalNewNotyficationChanged(new NotyficationItem(response.ErrorMessage, 'error'));
      }
      else if (response != null && response.Data != null) {
        for (var i = 0; i < response.Data.length; i++) {
          this.fontItems[response.Data[i].id] = response.Data[i];
        }
      }
      else {
        this.appManagerService.signalNewNotyficationChanged(new NotyficationItem('Server error.', 'error'));
      }
    });

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


