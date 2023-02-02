import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    console.error(
      'HTTP ' + exception.getStatus() + ':   ' +
      'time=\'' + new Date(Date.now()) + '\';   ' +
      'resp=\'' + exception.message + '\';   ' +
      'path=\'' + ctx.getRequest<Request>().url + '\';'
    )

    ctx
      .getResponse<Response>()
      .status(exception.getStatus())
      .json({
        statusCode: exception.getStatus(),
        errMessage: exception.message,
        timestamp: new Date().toISOString(),
        path: ctx.getRequest<Request>().url
      })
  }
}