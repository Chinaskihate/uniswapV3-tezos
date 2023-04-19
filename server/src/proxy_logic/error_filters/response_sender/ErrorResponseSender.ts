import {IErrorResponseSender} from "./IErrorResponseSender";
import {ArgumentsHost, Injectable} from "@nestjs/common";
import {Request, Response} from "express";
import {HttpArgumentsHost} from "@nestjs/common/interfaces";

@Injectable()
export class ErrorResponseSender implements IErrorResponseSender {
  sendResponse(host: ArgumentsHost, errorCode: number,
               errorMessage: string): void {
    const ctx: HttpArgumentsHost = host.switchToHttp()

    console.error(
      'CODE ' + errorCode + ':   ' +
      'time=\'' + new Date(Date.now()) + '\';   ' +
      'resp=\'' + errorMessage + '\';   ' +
      'path=\'' + ctx.getRequest<Request>().url + '\';'
    )

    ctx
      .getResponse<Response>()
      .status(errorCode)
      .json({
        status: errorCode,
        message: errorMessage,
        timestamp: new Date().toISOString(),
        path: ctx.getRequest<Request>().url
      })
  }
}