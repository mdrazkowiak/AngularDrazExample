import { Component, OnInit, HostListener } from '@angular/core';

import { GateService } from '../services/gates/gate.service';
import { AppManagerService } from '../services/appmanager.service';
import { ComboItem, NotyficationItem } from '../shared/sharedclasses.model';
import { AppProject } from './project.model';
import { Marker } from '../map/map.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  selectedPanelIndex: number = 0;

  fontItems: ComboItem[] = [];
  selectedFontItem: ComboItem;

  projectItem: AppProject;
  
  @HostListener('document:click', ['$event']) countClicks(event: Event) {
    if (this.projectItem != undefined) {
      this.projectItem.clicksCounter++;
    }
  }

  @HostListener('keydown', ['$event']) countKeys(event: Event) {
    if (this.projectItem != undefined) {
      this.projectItem.keysCounter++;
    }
  }

  constructor(private gate: GateService, private appManagerService: AppManagerService) {

  }

  ngOnInit() {

    this.gate.FontsListGet().subscribe((response: any) => {
      if (response != null && response.ErrorMessage != null && response.ErrorMessage != '') {
        this.appManagerService.signalNewNotyficationChanged( new NotyficationItem(response.ErrorMessage, 'error'));
      }
      else if (response != null && response.Data != null) {
        this.fontItems = response.Data;

        //TODO find a way to do it async
        this.gate.GetProject().subscribe((response: any) => {
          if (response != null && response.ErrorMessage != null && response.ErrorMessage != '') {
            this.appManagerService.signalNewNotyficationChanged(new NotyficationItem(response.ErrorMessage, 'error'));
          }
          else if (response != null && response.Data != null) {
            this.projectItem = response.Data;
            this.projectItem.fontID = this.fontItems[0].id;
          }
          else {
            this.appManagerService.signalNewNotyficationChanged(new NotyficationItem('Server error.', 'error'));
          }
        });

      }
      else {
        this.appManagerService.signalNewNotyficationChanged( new NotyficationItem ('Server error.', 'error'));
      }
    });

    
  }

  markerChanged(event: Marker) {
    this.projectItem.mapItem = event;
  }

  public saveProject() {
    if (this.validate()) {
      this.gate.SaveProject(this.projectItem).subscribe((response: any) => {
        if (response != null && response.ErrorMessage != null && response.ErrorMessage != '') {
          this.appManagerService.signalNewNotyficationChanged(new NotyficationItem(response.ErrorMessage, 'error'));
        }
        else if (response != null && response.Error === 0) {
          this.appManagerService.signalNewNotyficationChanged(new NotyficationItem('Project successfully saved.', 'success'));
        }
        else {
          this.appManagerService.signalNewNotyficationChanged(new NotyficationItem('Server error.', 'error'));
        }
      });
    }
  }

  private validate() {
    var returnvalue = true;

    if (this.projectItem.mapItem == undefined) {
      returnvalue = false;
      this.appManagerService.signalNewNotyficationChanged(new NotyficationItem('Insert map point.', 'error'));
    }

    if (!(this.projectItem.description.length > 0)) {
      returnvalue = false;
      this.appManagerService.signalNewNotyficationChanged(new NotyficationItem('Insert description.', 'error'));
    }

    if (!(this.projectItem.title.length > 0)) {
      returnvalue = false;
      this.appManagerService.signalNewNotyficationChanged(new NotyficationItem('Insert title.', 'error'));
    }

    return returnvalue;
  }

  
}


