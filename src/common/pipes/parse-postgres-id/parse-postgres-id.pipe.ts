import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'uuid';

@Injectable()
export class ParsePostgresIdPipe implements PipeTransform {
  transform(value: string, _: ArgumentMetadata) {
    if (!validate(value)) {
      throw new BadRequestException(`'${value}' is not a valid UUID`);
    }
    return value;
  }
}
