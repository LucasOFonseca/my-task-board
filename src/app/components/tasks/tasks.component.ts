import { Component } from '@angular/core';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  selector: 'app-tasks',
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './tasks.component.html',
})
export class TasksComponent {}
