import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiUrl = environment.apiUrl;
  private readonly httpClient = inject(HttpClient);

  private categories$ = this.httpClient.get<Category[]>(
    `${this.apiUrl}/categories`
  );

  categories = toSignal(this.categories$, { initialValue: [] });

  selectedCategory = signal<Category | null>(this.categories()[0]);

  setSelectedCategory(categoryId: string): void {
    this.selectedCategory.set(
      this.categories().find(c => c.id === categoryId)!
    );
  }
}
