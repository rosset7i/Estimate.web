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
  private errosDeServidor: number[] = [
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

  constructor(
    private messageService: MessageService,
    private loadingService: LoadingService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let finalizou = false;
    const timer = 500;

    setTimeout(() => {
      if (!finalizou) {
        this.loadingService.mostrar();
      }
    }, timer);

    return next.handle(req).pipe(
      finalize(() => {
        finalizou = true;
        this.loadingService.esconder();
      }),
      catchError((httpError: HttpErrorResponse) => this.errorHandler(httpError))
    );
  }

  errorHandler(httpError: HttpErrorResponse): Observable<never> {
    if (httpError.status === HttpStatusCode.Unauthorized)
      return throwError(() => new Error('Erro de Autenticação'));

    const mensagensDeErro = httpError.error?.errors;

    let erros =
      this.errosDeServidor.includes(httpError.status) ||
      mensagensDeErro === undefined
        ? 'Infelizmente, uma falha inesperada ocorreu em nossos servidores. Por favor, tente novamente mais tarde ou entre em contato com o suporte técnico para obter assistência.'
        : mensagensDeErro;

    const mensagemTratada = this.formatarMensagem(erros);

    this.messageService.openMessageModal(
      new ModalDefinition('Erro', mensagemTratada, false)
    );

    return throwError(() => new Error(mensagemTratada));
  }

  formatarMensagem(mensagem: string) {
    return JSON.stringify(mensagem).replace(/[{}"\[\]]/g, '');
  }
}
