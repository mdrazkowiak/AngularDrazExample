import { Marker } from '../map/map.model';

export class AppProject {
  
  public title: string;
  public description: string;
  public fontID: number;
  public fontColor: string;
  public fontSize10Em: number;
  public mapItem?: Marker;

  public clicksCounter: number = 0;
  public keysCounter: number = 0;
}
