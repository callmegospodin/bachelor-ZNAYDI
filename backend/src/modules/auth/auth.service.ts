import { AuthorizationUserResponseType, LoginUserBodyType, LoginUserEntityType } from '@modules/users/constants/user.types';
import { GetUserResponseType } from '@modules/users/dto/get-one-user.response.dto';
import { UsersService } from '@modules/users/users.service';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { JwtPayload } from './auth-jwt.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<LoginUserBodyType> {
    const user = await this.usersService.getAuthUser(email);

    if (!user) {
      throw new ForbiddenException('validateUser ForbiddenException');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      return user;
    }

    throw new ForbiddenException('validateUser match ForbiddenException');
  }

  async login(user: LoginUserEntityType): Promise<AuthorizationUserResponseType> {
    const { id, email } = user;

    return {
      id,
      email,
      token: this.jwtService.sign({ id: user.id, email: user.email }),
    };
  }

  async authenticate(jwtToken: string): Promise<any> {
    const result = this.jwtService.decode(jwtToken);

    if (!result) {
      throw new ForbiddenException('authenticate ForbiddenException');
    }

    return result;
  }

  async getBearerJwtToken(req): Promise<string> {
    if (!req.header('Authorization')) {
      throw new ForbiddenException('getBearerJwtToken ForbiddenException');
    }

    return req.header('Authorization').split(' ').pop();
  }

  async getUserData(jwtPayload: JwtPayload): Promise<GetUserResponseType> {
    return this.usersService.getOneUser(jwtPayload.email);
  }
}
