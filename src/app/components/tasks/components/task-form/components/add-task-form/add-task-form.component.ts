import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { finalize } from 'rxjs';
import { Task } from '../../../../../../models/task.model';
import { CategoryService } from '../../../../../../services/category.service';
import { TaskService } from '../../../../../../services/task.service';
import { SnackBarService } from '../../../../../../shared/services/snack-bar.service';
import { createTaskForm } from './utils/create-task-form';

@Component({
    selector: 'app-add-task-form',
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatLabel,
        MatSelectModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './add-task-form.component.html'
})
export class AddTaskFormComponent {
  private readonly categoryService = inject(CategoryService);
  private readonly taskService = inject(TaskService);
  private readonly snackBarService = inject(SnackBarService);

  readonly categories = this.categoryService.categories;

  taskForm = createTaskForm();
  isFormDisabled = computed(() => {
    if (this.taskService.isLoading()) {
      this.taskForm.disable();

      return true;
    }

    this.taskForm.enable();

    return false;
  });

  destroy$ = inject(DestroyRef);

  handleSelectCategory(event: MatSelectChange): void {
    this.categoryService.setSelectedCategory(event.value);
  }

  handleSubmit(): void {
    if (this.taskForm.invalid) return;

    this.taskService.isLoading.set(true);

    const newTask: Partial<Task> = {
      ...this.taskForm.value,
      isCompleted: false,
    };

    this.taskService
      .createTask(newTask)
      .pipe(
        finalize(() => this.taskService.isLoading.set(false)),
        takeUntilDestroyed(this.destroy$)
      )
      .subscribe({
        next: task => this.taskService.insertTaskInTheList(task),
        error: ({ error }) => this.snackBarService.showSnackBar(error.message),
        complete: () => this.snackBarService.showSnackBar('Task criada'),
      });
  }
}
