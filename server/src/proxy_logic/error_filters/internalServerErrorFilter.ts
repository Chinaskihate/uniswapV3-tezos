import {ArgumentsHost, Catch, ExceptionFilter} from "@nestjs/common";
import {BaseErrorFilter} from "./baseErrorFilter";

@Catch()
export class InternalServerErrorFilter extends BaseErrorFilter implements ExceptionFilter {
  private readonly CODE: number = 500

  catch(exception: Error, host: ArgumentsHost) {
    this._responseSender.sendResponse(host, this.CODE, exception.message)
  }
}