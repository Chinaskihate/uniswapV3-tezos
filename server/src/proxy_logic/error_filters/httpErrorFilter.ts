import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from "@nestjs/common";
import {BaseErrorFilter} from "./baseErrorFilter";

@Catch(HttpException)
export class HttpErrorFilter extends BaseErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    this._responseSender.sendResponse(host, exception.getStatus(), exception.message)
  }
}