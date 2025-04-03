import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { faker } from '@faker-js/faker';
import { makeHttpError } from '../__mocks__/http-error';
import { makeTask, makeTasks } from '../__mocks__/taks';
import { Task } from '../models/task.model';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpTestController: HttpTestingController;

  const mockedTasks = makeTasks();
  const mockedTask = makeTask();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TaskService);
    httpTestController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should order tasks by name', () => {
    const expectedTasks = mockedTasks.sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    const sortedTasks = service.getSortedTasksByName(mockedTasks);

    expect(sortedTasks).toEqual(expectedTasks);
  });

  describe('getTasks', () => {
    it('should throw an error on an internal server error', waitForAsync(() => {
      const httpError = makeHttpError(500);

      let errorRes: HttpErrorResponse | undefined;

      service.getTasks().subscribe({
        next: () => {
          fail('failed');
        },
        error: err => (errorRes = err),
      });

      const req = httpTestController.expectOne(`${service.apiUrl}/tasks`);

      req.flush(null, httpError);

      expect(req.request.method).toBe('GET');
      expect(errorRes?.statusText).toBe(httpError.statusText);
    }));

    it('should return a list of tasks', waitForAsync(() => {
      let tasks!: Task[];

      service.getTasks().subscribe(res => (tasks = res));

      const req = httpTestController.expectOne(`${service.apiUrl}/tasks`);

      req.flush(mockedTasks);
      expect(req.request.method).toBe('GET');

      expect(tasks).toEqual(mockedTasks);
      expect(service.tasks()).toEqual(mockedTasks);
    }));
  });

  describe('createTask', () => {
    it('should throw unprocessable entity error with invalid body', waitForAsync(() => {
      const httpError = makeHttpError(422);

      let errorRes: HttpErrorResponse | undefined;

      service.createTask(mockedTask).subscribe({
        next: () => {
          fail('failed');
        },
        error: err => (errorRes = err),
      });

      const req = httpTestController.expectOne(`${service.apiUrl}/tasks`);

      req.flush(null, httpError);

      expect(req.request.method).toBe('POST');
      expect(errorRes?.statusText).toBe(httpError.statusText);
    }));

    it('should create a task', waitForAsync(() => {
      let createdTask: Task | undefined;

      service.createTask(mockedTask).subscribe(res => {
        createdTask = res;
      });

      const req = httpTestController.expectOne(`${service.apiUrl}/tasks`);

      req.flush(mockedTask);
      expect(req.request.method).toBe('POST');

      expect(createdTask).toEqual(mockedTask);
    }));
  });

  describe('updateTask', () => {
    it('should throw unprocessable entity error with invalid body', waitForAsync(() => {
      const httpError = makeHttpError(422);

      let errorRes: HttpErrorResponse | undefined;

      service.updateTask(mockedTask).subscribe({
        next: () => {
          fail('failed');
        },
        error: err => (errorRes = err),
      });

      const req = httpTestController.expectOne(
        `${service.apiUrl}/tasks/${mockedTask.id}`
      );

      req.flush(null, httpError);

      expect(req.request.method).toBe('PUT');
      expect(errorRes?.statusText).toBe(httpError.statusText);
    }));

    it('should update a task', waitForAsync(() => {
      const updatedTask = { ...mockedTask, title: faker.lorem.sentence() };

      service.tasks.set([mockedTask]);

      service.updateTask(updatedTask).subscribe(() => {
        expect(service.tasks()[0]).toEqual(updatedTask);
      });

      const req = httpTestController.expectOne(
        `${service.apiUrl}/tasks/${mockedTask.id}`
      );

      req.flush(updatedTask);
      expect(req.request.method).toBe('PUT');
    }));
  });

  describe('updateIsCompletedStatus', () => {
    it('should throw unprocessable entity error with invalid body', waitForAsync(() => {
      const httpError = makeHttpError(422);

      let errorRes: HttpErrorResponse | undefined;

      service
        .updateIsCompletedStatus(mockedTask.id, !mockedTask.isCompleted)
        .subscribe({
          next: () => {
            fail('failed');
          },
          error: err => (errorRes = err),
        });

      const req = httpTestController.expectOne(
        `${service.apiUrl}/tasks/${mockedTask.id}`
      );

      req.flush(null, httpError);

      expect(req.request.method).toBe('PATCH');
      expect(errorRes?.statusText).toBe(httpError.statusText);
    }));

    it('should update task isCompleted', waitForAsync(() => {
      service.tasks.set([mockedTask]);

      service
        .updateIsCompletedStatus(mockedTask.id, !mockedTask.isCompleted)
        .subscribe(() => {
          expect(service.tasks()[0].isCompleted).toBe(!mockedTask.isCompleted);
        });

      const req = httpTestController.expectOne(
        `${service.apiUrl}/tasks/${mockedTask.id}`
      );

      req.flush({ ...mockedTask, isCompleted: !mockedTask.isCompleted });
      expect(req.request.method).toBe('PATCH');
    }));
  });

  describe('deleteTask', () => {
    it('should throw not found error', waitForAsync(() => {
      const httpError = makeHttpError(404);

      let errorRes: HttpErrorResponse | undefined;

      service.deleteTask(mockedTask.id).subscribe({
        next: () => {
          fail('failed');
        },
        error: err => (errorRes = err),
      });

      const req = httpTestController.expectOne(
        `${service.apiUrl}/tasks/${mockedTask.id}`
      );

      req.flush(null, httpError);

      expect(req.request.method).toBe('DELETE');
      expect(errorRes?.statusText).toBe(httpError.statusText);
    }));

    it('should remove a task from the list', waitForAsync(() => {
      service.tasks.set([mockedTask]);

      service.deleteTask(mockedTask.id).subscribe(() => {
        expect(service.tasks().length).toBe(0);
      });

      const req = httpTestController.expectOne(
        `${service.apiUrl}/tasks/${mockedTask.id}`
      );

      req.flush(null);
      expect(req.request.method).toBe('DELETE');
    }));
  });
});
