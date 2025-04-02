import { HttpErrorResponse } from '@angular/common/http';

type HttpError = Pick<HttpErrorResponse, 'status' | 'statusText'>;

const errors = {
  404: { status: 404, statusText: 'Not Found' },
  422: { status: 422, statusText: 'Unprocessable Entity' },
  500: { status: 500, statusText: 'Internal Server Error' },
};

export const makeHttpError = (errorCode: keyof typeof errors): HttpError =>
  errors[errorCode];
