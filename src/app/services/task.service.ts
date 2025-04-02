import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  readonly apiUrl = environment.apiUrl;
  private readonly httpClient = inject(HttpClient);

  tasks = signal<Task[]>([]);
  tasksCount = computed(() => this.tasks().length);

  getSortedTasksByName(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => a.title.localeCompare(b.title));
  }

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiUrl}/tasks`).pipe(
      tap(tasks => {
        const sortedTasks = this.getSortedTasksByName(tasks);

        this.tasks.set(sortedTasks);
      })
    );
  }

  insertTaskInTheList(newTask: Task): void {
    this.tasks.update(tasks => {
      const sortedTasks = this.getSortedTasksByName([...tasks, newTask]);

      return sortedTasks;
    });
  }

  createTask(task: Partial<Task>): Observable<Task> {
    return this.httpClient
      .post<Task>(`${this.apiUrl}/tasks`, task)
      .pipe(tap(task => this.insertTaskInTheList(task)));
  }

  updateTaskInTheList(updatedTask: Task): void {
    this.tasks.update(tasks => {
      const sortedTasks = this.getSortedTasksByName(
        tasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
      );

      return sortedTasks;
    });
  }

  updateTask(updatedTask: Task): Observable<Task> {
    return this.httpClient
      .put<Task>(`${this.apiUrl}/tasks/${updatedTask.id}`, updatedTask)
      .pipe(tap(task => this.updateTaskInTheList(task)));
  }

  updateIsCompletedStatus(
    taskId: string,
    isCompleted: boolean
  ): Observable<Task> {
    return this.httpClient
      .patch<Task>(`${this.apiUrl}/tasks/${taskId}`, {
        isCompleted,
      })
      .pipe(tap(task => this.updateTaskInTheList(task)));
  }

  removeTaskFromTheList(taskId: string): void {
    this.tasks.update(tasks => tasks.filter(task => task.id !== taskId));
  }

  deleteTask(taskId: string): Observable<Task> {
    return this.httpClient
      .delete<Task>(`${this.apiUrl}/tasks/${taskId}`)
      .pipe(tap(() => this.removeTaskFromTheList(taskId)));
  }
}
