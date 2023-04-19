import {ArgumentsHost, Catch, ExceptionFilter} from "@nestjs/common";
import {QueryFailedError} from "typeorm";
import {BaseErrorFilter} from "./baseErrorFilter";

@Catch(QueryFailedError)
export class QueryErrorFilter extends BaseErrorFilter implements ExceptionFilter {
  private readonly CODE: number = 400

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    this._responseSender.sendResponse(host, this.CODE, exception.message)
  }
}