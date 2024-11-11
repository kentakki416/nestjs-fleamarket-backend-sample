import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import type { JwtPayload } from '../types/JwtPayload'
import type { RequestUser } from '../types/reqeustUser'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // リクエストからJWTを取得
      ignoreExpiration: false, // 有効期限のチェックを行う
      secretOrKey: process.env.JWT_SECRET, // JWTの秘密鍵
    })
  }

  async validate(payload: JwtPayload): Promise<RequestUser> {
    return { id: payload.sub, name: payload.username, status: payload.status }
  }

}
