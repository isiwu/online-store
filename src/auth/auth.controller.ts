import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Req,
  Res,
} from '@nestjs/common';
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

  @Get('/login')
  @Render('auth/login')
  login() {
    const viewData = [];
    viewData['title'] = 'User Login - Online Store';
    viewData['subtitle'] = 'User Login';

    return {
      viewData,
    };
  }

  @Post('/connect')
  async connect(@Body() body, @Req() req, @Res() res) {
    const { email, password } = body;
    const user = await this.usersService.login(email, password);

    if (user) {
      req.session.user = {
        id: user.getId(),
        name: user.getName(),
        role: user.getRole(),
      };

      return res.redirect('/');
    } else {
      return res.redirect('/auth/login');
    }
  }

  @Get('/logout')
  @Redirect('/')
  logout(@Req() req) {
    req.session.user = null;
  }
}
