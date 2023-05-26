import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private BASE_TASK_URL = 'http://localhost:8080/task/';
  private ALL_URL = 'all';
  private INSERT_URL = 'create';
  private DELETE_URL = 'delete/';
  private UPDATE_URL = 'update';

  constructor(private http: HttpClient) {}

  public getAllTasks(): Observable<any> {
    return this.http.get(this.BASE_TASK_URL + this.ALL_URL);    
  }

  public insertTask(task: any): Observable<any> {
    return this.http.post(this.BASE_TASK_URL + this.INSERT_URL, task);    
  }

  public deleteTask(id: string): Observable<any> {
    return this.http.delete(this.BASE_TASK_URL + this.DELETE_URL + id);    
  }

  public updateTask(task: any): Observable<any> {
    return this.http.put(this.BASE_TASK_URL + this.UPDATE_URL, task);    
  }
}
