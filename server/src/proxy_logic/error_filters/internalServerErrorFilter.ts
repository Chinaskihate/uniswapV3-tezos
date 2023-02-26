import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(Error)
export class InternalServerErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    if (!exception.name.includes('Http')) {
      console.error(
        'ERROR   :  ' +
        'time=\'' + new Date(Date.now()) + '\';   ' +
        'type=\'' + exception.name + '\'; ' +
        'message=\'' + exception.message + '\';   '
      )

      const ctx = host.switchToHttp();

      ctx.getResponse<Response>()
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          timestamp: new Date().toISOString(),
          path: ctx.getRequest<Request>().url
        })
    } else throw exception
  }
}