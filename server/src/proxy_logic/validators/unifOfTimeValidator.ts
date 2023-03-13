import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { UnitOfTime } from "../../utils/time_converter/unitOfTime";

@Injectable()
export class UnitOfTimeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.data == 'unitOfTime' && typeof value == 'string'
      && !Object.values(UnitOfTime).includes(value.toUpperCase())) {
      throw new HttpException('incorrect unitOfTime',
        HttpStatus.BAD_REQUEST
      )
    }
    return value
  }
}