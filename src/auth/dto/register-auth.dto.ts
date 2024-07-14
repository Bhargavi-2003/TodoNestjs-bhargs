// import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsNotEmpty,IsEmail,Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserDto {
    @IsString()
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name : string
    
    @ApiProperty()
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email : string
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(6,20)
    password : string
}
