import { IsEmail, IsNotEmpty, IsNumberString, IsPhoneNumber, IsString, MaxLength } from "class-validator";

export class CreateStudentDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name:               string;

  @IsString()
  @IsEmail()
  @MaxLength(50)
  @IsNotEmpty()
  email:              string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  dad_lastname:      string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  mother_lastname:    string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('BO')
  @MaxLength(8)
  phone:              string;

  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(10)
  ci:                 string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  sex:                string;
}
