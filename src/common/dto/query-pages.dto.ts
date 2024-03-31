import { IsNumberString, IsOptional } from "class-validator"

export class queryPagesDto {

  @IsOptional()
  @IsNumberString()
  take:    string

  @IsOptional()
  @IsNumberString()
  skip:    string

}