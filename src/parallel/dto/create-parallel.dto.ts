import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateParallelDto {
  @IsString()
  @MaxLength(1)
  @IsNotEmpty()
  name:         string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  course_id:    string;
}
