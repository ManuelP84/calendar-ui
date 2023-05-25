import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  public tasks: any[] = []

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe(response => {
      this.tasks = response;
    })
  }
}
