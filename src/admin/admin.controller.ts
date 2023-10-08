import { Controller, Get, Render } from '@nestjs/common';
import { ProductsService } from 'src/models/products.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly productsService: ProductsService) {}
  @Get('/')
  @Render('admin/index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Admin Page - Online Store';
    viewData['products'] = await this.productsService.findAll();

    return {
      viewData,
    };
  }
}
