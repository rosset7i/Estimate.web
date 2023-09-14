import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';
import { GlobalErrorInterceptor } from './global-error-interceptor';

export const HttpContextInterceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: GlobalErrorInterceptor, multi: true },
];
