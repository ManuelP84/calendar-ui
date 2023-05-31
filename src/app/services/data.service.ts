import { Injectable } from '@angular/core';

interface TaskModel {
  id: string;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  tasks: TaskModel[] = []

  constructor() { }
}
