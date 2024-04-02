import { IsString, IsUUID } from "class-validator";

export class CreateExcelStudentsDto {

  @IsString()
  @IsUUID()
  parallelId:         string;

  @IsString()
  @IsUUID()
  managementId:       string;

}
