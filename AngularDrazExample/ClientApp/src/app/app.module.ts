import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { HomeComponent } from './home/home.component';
import { CounterStatsComponent } from './counter-stats/counter-stats.component';
import { ProjectPreviewComponent } from './project-preview/project-preview.component';
import { MapComponent } from './map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule, SliderModule, TextBoxModule  } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { ChartModule } from '@progress/kendo-angular-charts';

import { GateService } from './services/gates/gate.service';
import { AppManagerService } from './services/appmanager.service';

import { SafeHtmlPipe } from './shared/safeHtml.pipe';

import 'hammerjs';




@NgModule({
  declarations: [    
    AppComponent,
    NavMenuComponent,
    HeaderComponent,
    HomeComponent,
    CounterStatsComponent,
    ProjectPreviewComponent,
    MapComponent,
    SafeHtmlPipe
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    DropDownsModule,
    HttpClientModule,
    FormsModule,
    ColorPickerModule, SliderModule, TextBoxModule,
    NotificationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'viewproject', component: ProjectPreviewComponent },
      { path: 'stats', component: CounterStatsComponent },
    ]),
    ChartModule 
  ],
  providers: [
    AppManagerService,
    GateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
