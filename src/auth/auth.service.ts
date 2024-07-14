import { BadGatewayException,NotFoundException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-auth.dto';
import { LoginDTO } from './dto/login.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtservice: JwtService
  ){}

  async login(loginData: LoginDTO) {

    const {email,password} = loginData;
    const user = await this.databaseService.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    const validatePassword = await bcrypt.compare(password,user.password);

    if (!validatePassword) {
      throw new NotFoundException('Wrong Password');
    }

    return {
      Token: this.jwtservice.sign({ email }),
    }
  }

  async register(registerData: RegisterUserDto) {
    const user = await this.databaseService.user.findFirst({
      where:{
        email: registerData.email
      }
    })
    if (user){
      throw new BadGatewayException('User with this email already exists')
    }
    registerData.password = await bcrypt.hash(registerData.password, 10);
    const res = await this.databaseService.user.create({ data: registerData });
    return res;
  }
  
  
  
}

