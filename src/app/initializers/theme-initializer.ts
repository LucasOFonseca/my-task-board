import {
  EnvironmentProviders,
  inject,
  provideAppInitializer,
  Provider,
} from '@angular/core';
import { ThemeService } from '../shared/services/theme.service';

function initializeTheme(): () => void {
  const themeService = inject(ThemeService);

  return () => {
    const currentColorTheme = themeService.getPreferredColorTheme();

    themeService.setColorTheme(currentColorTheme);
  };
}

export const configThemeInitializerProvider: Provider | EnvironmentProviders =
  provideAppInitializer(() => {
    const initializerFn = initializeTheme();

    return initializerFn();
  });
