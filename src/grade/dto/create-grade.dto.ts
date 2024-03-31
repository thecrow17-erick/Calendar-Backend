import { IsNotEmpty, IsString } from "class-validator";

export class CreateGradeDto {

  @IsString()
  @IsNotEmpty()
  name:       string;

  @IsString()
  @IsNotEmpty()
  desc:       string;

}
