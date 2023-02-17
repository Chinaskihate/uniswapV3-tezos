import { CallHandler, ExecutionContext, HttpException, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { JsonTokenFormatter } from "../../utils/token_formatter/jsonTokenFormatter";
import { IjsonTokenFormatter } from "../../utils/token_formatter/IjsonTokenFormatter";

@Injectable()
export class ResponseFormatterInterceptor implements NestInterceptor {
  constructor(@Inject(JsonTokenFormatter)
              private readonly _jsonTokenFormatter: IjsonTokenFormatter) { }

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