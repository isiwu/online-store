import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  //constructor(parameters) {}
  @Get('/')
  @Render('admin/index')
  index() {
    const viewData = [];
    viewData['title'] = 'Admin Page - Online Store';
    return {
      viewData,
    };
  }
}
