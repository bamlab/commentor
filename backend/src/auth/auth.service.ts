import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getGithubUserLogin() {
    console.log('coucou');
  }
}
