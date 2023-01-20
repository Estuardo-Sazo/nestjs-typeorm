import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validatUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...rpt } = user;
        return rpt;
      }
    }
    return null;
  }

  generateJWT(user: User) {
    const payload = { role: user.role, sub: user.id };
  }
}
