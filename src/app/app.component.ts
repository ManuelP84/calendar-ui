import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { v4 as uuidv4 } from 'uuid';

interface TaskModel {
  id: string;
  title: string;
  description: string;
}

const defaultTask: TaskModel = {
  id: '',
  title: '',
  description: '',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public task: TaskModel = { ...defaultTask };
  constructor(private taskService: TaskService) {}

  public tasks: TaskModel[] = [];
  public inputTitle: string = ''
  public inputDescription: string = ''

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe((response) => {
      this.tasks = response;
    });
  }

  saveTask(): void {
    // const newID = new Date().getTime().toString();
    this.task = {
      id: uuidv4(),
      title: this.inputTitle,
      description: this.inputDescription,
    };
    this.taskService.insertTask(this.task).subscribe((resp) => {
      if(resp === "OK") this.tasks.push(this.task);
      this.inputTitle= '';
      this.inputDescription = '';
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe((resp) => {
      if(resp === "OK") this.tasks = this.tasks.filter((task) => task.id != id);      
    });
  }
}
