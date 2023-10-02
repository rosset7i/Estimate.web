import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, finalize, throwError } from 'rxjs';
import { DefinicaoModal } from '../models/modal-definicao';
import { ModalService } from '../services/modal.service';

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

  constructor(private modalService: ModalService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      finalize(() => {}),
      catchError((httpError: HttpErrorResponse) => this.captureError(httpError))
    );
  }
  captureError(httpError: HttpErrorResponse) {
    let error = this.severityErrors.includes(httpError.status)
      ? 'Infelizmente, uma falha inesperada ocorreu em nossos servidores. Por favor, tente novamente mais tarde ou entre em contato com o suporte técnico para obter assistência.'
      : httpError.error.errors;

    const mensagemTratada = this.tratarMensagem(error);

    const modalDef = new DefinicaoModal('Erro', mensagemTratada, false);

    this.modalService.abrirModal(modalDef);

    return throwError(() => new Error(mensagemTratada));
  }

  tratarMensagem(mensagem: string) {
    return JSON.stringify(mensagem).replace(/[{}"\[\]]/g, '');
  }
}
