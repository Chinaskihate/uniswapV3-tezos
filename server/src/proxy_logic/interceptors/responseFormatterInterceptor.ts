import { CallHandler, ExecutionContext, HttpException, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { JSON_TokenFormatter } from "../../utils/token_formatter/JSON_TokenFormatter";
import { I_JSON_TokenFormatter } from "../../utils/token_formatter/I_JSON_TokenFormatter";

@Injectable()
export class ResponseFormatterInterceptor implements NestInterceptor {
  constructor(@Inject(JSON_TokenFormatter)
              private readonly _jsonTokenFormatter: I_JSON_TokenFormatter) { }

  // formatting json response
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map(resp => {
          if (resp == undefined || resp == '[]') {
            throw new HttpException('not found', 404)
          }
          return this._jsonTokenFormatter.format(resp)
        })
      );
  }
}