import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, finalize, throwError } from 'rxjs';
import { ModalMessageComponent } from '../components/modal-message/modal-message.component';

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {
  private severityErrors = [
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

  constructor(private modalService: NgbModal) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      finalize(() => {}),
      catchError((httpError: HttpErrorResponse) => this.captureError(httpError))
    );
  }
  captureError(httpError: HttpErrorResponse) {
    let error = this.severityErrors.includes(httpError.status)
      ? 'Infelizmente, uma falha inesperada ocorreu em nossos servidores. \n Por favor, tente novamente mais tarde ou entre em contato com o suporte técnico para obter assistência.'
      : httpError.error.errors;

    const mensagemTratada = this.tratarMensagem(error);

    const modalRef = this.modalService.open(ModalMessageComponent, {
      size: 'sm',
    });
    modalRef.componentInstance.mensagem = mensagemTratada;

    return throwError(() => new Error(mensagemTratada));
  }

  tratarMensagem(mensagem: string) {
    return JSON.stringify(mensagem).replace(/[{}"\[\]]/g, '');
  }
}
