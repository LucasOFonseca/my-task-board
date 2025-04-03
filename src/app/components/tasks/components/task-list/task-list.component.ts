import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TaskService } from '../../../../services/task.service';
import { NoTasksComponent } from '../no-tasks/no-tasks.component';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, NoTasksComponent],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  private readonly taskService = inject(TaskService);

  tasks$ = this.taskService.getTasks();

  readonly tasks = this.taskService.tasks;
  readonly tasksCount = this.taskService.tasksCount;
}
