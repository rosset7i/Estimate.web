import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, finalize, throwError } from 'rxjs';
import { ModalDefinition } from '../models/modal-definition';
import { MessageService } from '../services/message.service';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {
  private serverErrors: number[] = [
    HttpStatusCode.InternalServerError,
    HttpStatusCode.NotImplemented,
    HttpStatusCode.BadGateway,
    HttpStatusCode.ServiceUnavailable,
    HttpStatusCode.GatewayTimeout,
    HttpStatusCode.HttpVersionNotSupported,
    HttpStatusCode.VariantAlsoNegotiates,
    HttpStatusCode.InsufficientStorage,
    HttpStatusCode.LoopDetected,
    HttpStatusCode.NotExtended,
    HttpStatusCode.NetworkAuthenticationRequired,
  ];

  public constructor(
    private messageService: MessageService,
    private loadingService: LoadingService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    let finalized = false;
    const timer = 500;

    setTimeout(() => {
      if (!finalized) {
        this.loadingService.show();
      }
    }, timer);

    return next.handle(req).pipe(
      finalize(() => {
        finalized = true;
        this.loadingService.hide();
      }),
      catchError((httpError: HttpErrorResponse) => this.errorHandler(httpError))
    );
  }

  private async errorHandler(httpError: HttpErrorResponse): Promise<Observable<never>> {
    if (httpError.status === HttpStatusCode.Unauthorized)
      return throwError(() => new Error('Auth Error'));

    const errorMessages = httpError.error?.errors.map(e => e.message);

    const errors =
      this.serverErrors.includes(httpError.status) ||
      errorMessages === undefined
        ? 'Critical error. Please try again, if the problem persists, please contact our support team.'
        : errorMessages.join('\n');

    await this.messageService.openMessageModal(
      new ModalDefinition('Error', errors, false)
    );

    return throwError(() => new Error(errors));
  }
}
