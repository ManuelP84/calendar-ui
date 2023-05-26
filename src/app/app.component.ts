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
  public inputTitle: string = '';
  public inputDescription: string = '';
  public id: string = '';

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe((response) => {
      this.tasks = response;
    });
  }

  saveTask(): void {
    // const newID = new Date().getTime().toString();
    if (!this.inputTitle || !this.inputDescription) return;
    if (!this.id) {
      this.task = {
        id: uuidv4(),
        title: this.inputTitle,
        description: this.inputDescription,
      };
      this.taskService.insertTask(this.task).subscribe((resp) => {
        if (resp === 'OK') this.tasks.push(this.task);
        this.inputTitle = '';
        this.inputDescription = '';
      });
      return;
    }

    this.task = {
      id: this.id,
      title: this.inputTitle,
      description: this.inputDescription,
    };
    this.taskService.updateTask(this.task).subscribe((resp) => {
      this.tasks = this.tasks.filter((t) => t.id != this.task.id);
      this.tasks.push(this.task);
      this.inputTitle = '';
      this.inputDescription = '';
      this.id = '';
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe((resp) => {
      if (resp === 'OK')
        this.tasks = this.tasks.filter((task) => task.id != id);
    });
  }

  editTask(task: TaskModel): void {
    this.inputTitle = task.title;
    this.inputDescription = task.description;
    this.id = task.id;
  }
}
