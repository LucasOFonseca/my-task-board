import { inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

interface TaskFormControl {
  title: FormControl<string>;
  categoryId: FormControl<string>;
}

export function createTaskForm(): FormGroup<TaskFormControl> {
  const formBuilder = inject(NonNullableFormBuilder);

  return formBuilder.group({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    categoryId: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
}

export type TaskFormValue = ReturnType<
  ReturnType<typeof createTaskForm>['getRawValue']
>;
