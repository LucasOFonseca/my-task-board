import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { categoryBgColors } from '../../../../constants/category-colors';
import { CategoryService } from '../../../../services/category.service';

@Component({
    selector: 'app-colors-list',
    imports: [MatDividerModule],
    templateUrl: './colors-list.component.html'
})
export class ColorsListComponent {
  private readonly categoryService = inject(CategoryService);

  categoryBgColors = categoryBgColors;
  categories = this.categoryService.categories;
}
