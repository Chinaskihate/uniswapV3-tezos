import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { Request } from "express";

/**
 * simple AOP logger
 */
@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>()
    console.info('REQUEST :  ' +
      'time=\'' + new Date(Date.now()) + '\';   ' +
      'url=\'' + req.url + '\';   ' +
      'method=\'' + req.method + '\''
    )

    return next
      .handle()
      .pipe(
        tap((resp) => console.log(
          'RESPONSE:  ' +
          'time=\'' + new Date(Date.now()) + '\';   ' +
          'resp=\'' + resp + '\'')),
      );
  }
}