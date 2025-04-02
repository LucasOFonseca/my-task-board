import { Component } from '@angular/core';
import { ColorsListComponent } from './components/colors-list/colors-list.component';
import { MainListComponent } from './components/main-list/main-list.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MainListComponent, ColorsListComponent],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {}
