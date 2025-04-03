import { inject, Injectable, signal } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private _snackBar = inject(MatSnackBar);

  message = signal('');
  duration = 3000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  private openSnackBar(): void {
    this._snackBar.open(this.message(), 'X', {
      duration: this.duration,
    });
  }

  showSnackBar(
    message: string,
    duration = this.duration,
    verticalPosition = this.verticalPosition,
    horizontalPosition = this.horizontalPosition
  ): void {
    this.message.set(message);
    this.duration = duration;
    this.verticalPosition = verticalPosition;
    this.horizontalPosition = horizontalPosition;

    this.openSnackBar();
  }
}
