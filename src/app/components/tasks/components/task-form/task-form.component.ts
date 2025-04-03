import { Component, inject } from '@angular/core';
import { categoryBgColors } from '../../../../constants/category-colors';
import { CategoryService } from '../../../../services/category.service';
import { AddTaskFormComponent } from './components/add-task-form/add-task-form.component';

@Component({
    selector: 'app-task-form',
    imports: [AddTaskFormComponent],
    templateUrl: './task-form.component.html'
})
export class TaskFormComponent {
  private readonly categoryService = inject(CategoryService);

  readonly categoryBgColors = categoryBgColors;
  readonly selectedCategory = this.categoryService.selectedCategory;
}
