import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { TaskService } from '../../../services/task.service';

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
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  constructor(private taskService: TaskService) {}

  public task: TaskModel = { ...defaultTask };
  public tasks: TaskModel[] = [];
  public inputTitle: string = '';
  public inputDescription: string = '';
  public id: string = '';

  public boundedSaveTask = this.saveTask.bind(this);
  public boundedDeleteTask = this.deleteTask.bind(this);
  public boundedEditTask = this.editTask.bind(this);

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe((response) => {
      this.tasks = response;
    });
  }

  public saveTask(): void {
    if (!this.inputTitle || !this.inputDescription) return;
    if (!this.id) {
      this.task = {
        id: uuidv4(),
        title: this.inputTitle,
        description: this.inputDescription,
      };

      this.taskService.insertTask(this.task).subscribe((resp) => {
        this.tasks = [...this.tasks, this.task]
        this.inputTitle = '';
        this.inputDescription = '';
      });
    }
    if (this.id) {
      this.task = {
        id: this.id,
        title: this.inputTitle,
        description: this.inputDescription,
      };
      this.taskService.updateTask(this.task).subscribe((resp) => {
        this.tasks = this.tasks.filter((t) => t.id != this.task.id);
        this.tasks = [...this.tasks, this.task]
        this.inputTitle = '';
        this.inputDescription = '';
        this.id = '';
      });
    }
  }

  public deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe((resp) => {
      if (resp === 'OK')
        this.tasks = this.tasks.filter((task) => task.id != id);
      this.inputTitle = '';
      this.inputDescription = '';
      this.id = '';
    });
  }

  public editTask(task: TaskModel): void {
    this.inputTitle = task.title;
    this.inputDescription = task.description;
    this.id = task.id;
  }
}
