import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { Marker } from './map.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  // google maps zoom level
  zoom: number = 6;

  // initial center position for the map
  lat: number = 52.5000000;
  lng: number = 15.015982;

  @Input() showAddButton: boolean;
  @Input() set newMarker(value: Marker) {
    if (value != undefined) {
      if (this.markers.length <= 4) {
        this.markers.push(value);
        
      }
    } 
  }

  @Output('markerChanged') onMarkerChanged = new EventEmitter<Marker>();

  clickedMarker(label: string, index: number) {
    //console.log(`clicked the marker: ${label || index}`)
  }

  addMarker() {
    if (this.markers.length <= 4) {
      this.markers.push({
        lat: 52.5000000,//$event.coords.lat,
        lng: 15.015982,//$event.coords.lng,
        draggable: true
      });
      this.onMarkerChanged.emit(this.markers[4]);
    }
  }

  markerDragEnd(m: Marker, $event: MouseEvent, index: number) {
    m.lat = $event.coords.lat;
    m.lng = $event.coords.lng;

    this.onMarkerChanged.emit(m);
  }

  markers: Marker[] = [
    {
      lat: 53.1333300,
      lng: 23.1643300,
      title: 'Białystok',
      draggable: false
    },
    {
      lat: 52.2297700,
      lng: 21.0117800,
      title: 'Warszawa',
      draggable: false
    },
    {
      lat: 52.4069200,
      lng: 16.9299300,
      title: 'Poznań',
      draggable: false
    },
    {
      lat: 53.0751600,
      lng: 8.8077700,
      title: 'Bremen',
      draggable: false
    }
  ]
}
