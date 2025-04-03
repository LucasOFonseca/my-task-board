import { Component } from '@angular/core';
import { TaskFormComponent } from './components/task-form/task-form.component';

@Component({
    selector: 'app-tasks',
    imports: [TaskFormComponent],
    templateUrl: './tasks.component.html'
})
export class TasksComponent {}
