import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateManagementDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(4)
  year:         string;

  @IsString()
  @IsNotEmpty()
  description:  string;

}
