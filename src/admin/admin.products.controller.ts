import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { Product } from 'src/models/product.entity';
import { ProductsService } from 'src/models/products.service';
import { ProductValidator } from 'src/validators/product.validator';

@Controller('admin/products')
export class AdminProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  @Render('admin/products/index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Admin Page - Admin - Online Store';
    viewData['products'] = await this.productsService.findAll();
    //console.log('products', viewData);

    return {
      viewData,
    };
  }

  @Post('/store')
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads' }))
  @Redirect('/admin/products')
  async store(
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    const toValidate = ['name', 'description', 'price', 'imageCreate'];
    const errors = ProductValidator.validate(body, file, toValidate);

    if (errors.length > 0) {
      if (file) {
        fs.unlinkSync(file.path);
      }
      req.session.flashErrors = errors;
    } else {
      const newProduct = new Product();
      newProduct.setName(body.name);
      newProduct.setDescription(body.description);
      newProduct.setPrice(body.price);
      newProduct.setImage(file.filename);
      await this.productsService.createOrUpdate(newProduct);
    }
  }

  @Post('/:id')
  @Redirect('/admin/products')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Get('/:id')
  @Render('admin/products/edit')
  async edit(@Param('id') id: string) {
    const viewData = [];
    viewData['title'] = 'Admin Page - Edit Product - Online Store';
    viewData['product'] = await this.productsService.findOne(id);

    return {
      viewData,
    };
  }

  @Post('/:id/update')
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads' }))
  //@Redirect('/admin/products')
  async update(
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Req() req,
    @Res() res,
  ) {
    const toValidate = ['name', 'description', 'price', 'imageUpdate'];
    const errors = ProductValidator.validate(body, file, toValidate);
    if (errors.length > 0) {
      if (file) {
        fs.unlinkSync(file.path);
      }
      req.session.flashErrors = errors;
      return res.redirect('/admin/products/' + id);
    } else {
      const product = await this.productsService.findOne(id);
      product.setName(body.name);
      product.setPrice(body.price);
      file && product.setImage(file.filename);
      await this.productsService.createOrUpdate(product);
      return res.redirect('/admin/products');
    }
  }
}
