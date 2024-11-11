import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto'
import type { CredentialsDto } from './dto/credentials.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto)
  }

  @Post('signin')
  async signIn(@Body() credentialsDto: CredentialsDto) {
    return await this.authService.singIn(credentialsDto)
  }
}
