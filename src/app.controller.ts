import { Controller, Get, Render } from '@nestjs/common';
//import { AppService } from './app.service';

@Controller()
export class AppController {
  //constructor(private readonly appService: AppService) {}

  @Get('/')
  // getHello(): string {
  //   return '<b>Hello World!</b>';
  // }
  @Render('index')
  index() {
    const viewData = [];
    viewData['title'] = 'Home page - Online Store';
    return {
      viewData,
    };
  }

  @Get('/about')
  @Render('about')
  about() {
    const viewData = [];
    viewData['description'] = 'This is an about page...';
    viewData['author'] = 'Developed by: Emma';
    const data1 = 'About Us - Online Store';

    return {
      title: data1,
      subtitle: 'About us',
      viewData,
    };
  }
}
