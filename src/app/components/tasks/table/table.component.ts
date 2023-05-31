import { Component, Input, OnInit } from '@angular/core';

export interface TaskElement {
  title: string;
  description: string;
}

interface TaskModel {
  id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  constructor() {}
  
  @Input()
  public deleteTask!: (id: string) => void;
  @Input()
  public editTask!: (task: TaskModel) => void;
  @Input()
  public tasks!: TaskModel[];
  @Input()
  public saveTask!: () => void;

  ngOnInit(): void {}

  displayedColumns: string[] = ['title', 'description', 'edit', 'delete'];
}
