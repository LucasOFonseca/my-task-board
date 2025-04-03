import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { makeTask } from '../../../../../../__mocks__/taks';
import { Task } from '../../../../../../models/task.model';
import { CategoryService } from '../../../../../../services/category.service';
import { TaskService } from '../../../../../../services/task.service';
import { SnackBarService } from '../../../../../../shared/services/snack-bar.service';
import { AddTaskFormComponent } from './add-task-form.component';

describe('AddTaskFormComponent', () => {
  let component: AddTaskFormComponent;
  let fixture: ComponentFixture<AddTaskFormComponent>;

  let categoryService: CategoryService;
  let taskService: TaskService;
  let snackBarService: SnackBarService;

  let createTaskSpy: jest.SpyInstance<Observable<Task>>;

  const mockedTask = makeTask();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTaskFormComponent);

    categoryService = TestBed.inject(CategoryService);
    taskService = TestBed.inject(TaskService);
    snackBarService = TestBed.inject(SnackBarService);

    createTaskSpy = jest
      .spyOn(taskService, 'createTask')
      .mockReturnValue(of(mockedTask));

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('visibility', () => {
    it('should render initial taskForm state value', () => {
      const taskForm = component.taskForm;

      expect(taskForm.controls.title.value).toBe('');
      expect(taskForm.controls.categoryId.value).toBe('1');
    });

    it('should render form labels correctly', () => {
      const titleLabel = fixture.debugElement.query(
        By.css('[data-testid="title"]')
      );
      const categoryLabel = fixture.debugElement.query(
        By.css('[data-testid="categoryId"]')
      );

      expect(titleLabel.nativeElement.textContent).toBe('Tarefa');
      expect(categoryLabel.nativeElement.textContent).toBe('Categoria');
    });
  });

  it('should call handleSelectCategory on category change', () => {
    const event = { value: '2' };

    const handleSelectCategorySpy = jest
      .spyOn(component, 'handleSelectCategory')
      .mockImplementation();

    fixture.debugElement
      .query(By.css('mat-select'))
      .triggerEventHandler('selectionChange', event);

    expect(handleSelectCategorySpy).toHaveBeenCalledWith(event);
  });
});
