import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { JsonTokenFormatter } from "../../utils/jsonTokenFormatter";

@Injectable()
export class ResponseFormatterInterceptor implements NestInterceptor {
  // formatting json response
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map(resp => {
          if (resp == undefined || resp == '[]') {
            throw new HttpException('not found', 404)
          }
          return JsonTokenFormatter.format(resp)
        })
      );
  }
}