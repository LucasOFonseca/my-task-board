import { Component } from '@angular/core';
import { MainComponent } from './layout/main/main.component';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';

@Component({
    selector: 'app-root',
    imports: [ThemeToggleComponent, MainComponent],
    template: `
    <div class="relative min-h-screen w-full">
      <app-theme-toggle />

      <app-main />
    </div>
  `,
    styles: ``
})
export class AppComponent {}
