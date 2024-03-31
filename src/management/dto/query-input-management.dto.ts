import { IsNumberString, IsOptional } from "class-validator"

export class queryManagementDto {

  @IsOptional()
  @IsNumberString()
  take:    string

  @IsOptional()
  @IsNumberString()
  skip:    string

}