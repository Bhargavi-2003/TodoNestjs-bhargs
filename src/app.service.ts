import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hey! You are at the right place. This is my Todo rest API!';
  }
}