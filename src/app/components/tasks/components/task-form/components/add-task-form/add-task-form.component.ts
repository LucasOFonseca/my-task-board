import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Task } from '../../../../../../models/task.model';
import { CategoryService } from '../../../../../../services/category.service';
import { TaskService } from '../../../../../../services/task.service';
import { createTaskForm } from './utils/create-task-form';

@Component({
  selector: 'app-add-task-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatLabel,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-task-form.component.html',
})
export class AddTaskFormComponent {
  private readonly categoryService = inject(CategoryService);
  private readonly taskService = inject(TaskService);

  readonly categories = this.categoryService.categories;

  taskForm = createTaskForm();

  destroy$ = inject(DestroyRef);

  handleSelectCategory(event: MatSelectChange): void {
    this.categoryService.setSelectedCategory(event.value);
  }

  handleSubmit(): void {
    if (this.taskForm.invalid) return;

    const newTask: Partial<Task> = {
      ...this.taskForm.value,
      isCompleted: false,
    };

    this.taskService
      .createTask(newTask)
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe({
        next: task => this.taskService.insertTaskInTheList(task),
        error: err => console.error(err),
        complete: () => alert('Task criada'),
      });
  }
}
