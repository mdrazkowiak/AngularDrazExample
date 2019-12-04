import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppProject } from '../../home/project.model';

@Injectable()
export class GateService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  constructor(private http: HttpClient) {
  }

  FontsListGet(): any {
    return this.http.get('api/SampleData/FontsListGet');
  }

  SaveProject(project: AppProject): any {
    return this.http.post('api/SampleData/SaveProject', project, { headers: this.headers, withCredentials: true });
  }

  GetProject(): any {
    return this.http.get('api/SampleData/GetProject');
  }

}
