import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { CredentialsDto } from './dto/credentials.dto'
import type { JwtPayload } from '../types/JwtPayload'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async createUser(CreateUserDto: CreateUserDto) {
    const { name, email, password, status } = CreateUserDto

    const hashedPassword = await bcrypt.hash(password, 10)
    return await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        status
      }
    })
  }

  async singIn(credentialsDto: CredentialsDto) {
    const { email, password } = credentialsDto
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {
        sub: user.id,
        username: user.name,
        status: user.status,
      }
      const token = this.jwtService.sign(payload)
      return {token}
    }
    throw new UnauthorizedException()
  }

}
