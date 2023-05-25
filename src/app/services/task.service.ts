import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private TASK_API_URL = 'http://localhost:8080/task/all';

  constructor(private http: HttpClient) {}

  public getAllTasks(): Observable<any> {
    return this.http.get(this.TASK_API_URL);    
  }
}
