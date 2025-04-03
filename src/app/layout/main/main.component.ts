import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { TasksComponent } from '../../components/tasks/tasks.component';

@Component({
    selector: 'app-main',
    imports: [CategoriesComponent, TasksComponent, MatDividerModule],
    templateUrl: './main.component.html'
})
export class MainComponent {}
