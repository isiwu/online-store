import { Body, Controller, Get, Post, Redirect, Render } from '@nestjs/common';
import { User } from 'src/models/user.entity';
import { UsersService } from 'src/models/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/register')
  @Render('auth/register')
  register() {
    const viewData = [];
    viewData['title'] = 'User Register - Online Store';
    viewData['subtitle'] = 'User register';

    return {
      viewData,
    };
  }

  @Post('/store')
  @Redirect('/')
  async store(@Body() body) {
    const user = new User();
    user.setName(body.name);
    user.setEmail(body.email);
    user.setPassword(body.password);
    user.setRole('client');
    user.setBalance(1000);
    await this.usersService.createOrUpdate(user);
  }
}
