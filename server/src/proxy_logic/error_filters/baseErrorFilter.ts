import {Inject} from "@nestjs/common";
import {ErrorResponseSender} from "./response_sender/ErrorResponseSender";
import {IErrorResponseSender} from "./response_sender/IErrorResponseSender";

export class BaseErrorFilter {
  @Inject(ErrorResponseSender)
  protected readonly _responseSender: IErrorResponseSender
}