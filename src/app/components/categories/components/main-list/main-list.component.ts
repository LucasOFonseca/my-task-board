import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';

@Component({
    selector: 'app-main-list',
    imports: [],
    templateUrl: './main-list.component.html'
})
export class MainListComponent {
  private readonly categoryService = inject(CategoryService);

  categories = this.categoryService.categories;
}
