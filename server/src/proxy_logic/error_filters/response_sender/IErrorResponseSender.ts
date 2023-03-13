import {ArgumentsHost} from "@nestjs/common";

export interface IErrorResponseSender {
  sendResponse(host: ArgumentsHost, errorCode: number, errorMessage: string): void
}