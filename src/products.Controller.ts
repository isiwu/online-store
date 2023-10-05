import { Controller, Get, Param, Render, Res } from '@nestjs/common';
import { ProductsService } from './models/products.service';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  // static products = [
  //   {
  //     id: '1',
  //     name: 'TV',
  //     description: 'Best tv',
  //     image: 'game.png',
  //     price: '1000',
  //   },
  //   {
  //     id: '2',
  //     name: 'iPhone',
  //     description: 'Best iPhone',
  //     image: 'safe.png',
  //     price: '999',
  //   },
  //   {
  //     id: '3',
  //     name: 'Chromecast',
  //     description: 'Best Chromecast',
  //     image: 'submarine.png',
  //     price: '30',
  //   },
  //   {
  //     id: '4',
  //     name: 'Glasses',
  //     description: 'Best Glasses',
  //     image: 'game.png',
  //     price: '100',
  //   },
  // ];
  @Get('/')
  @Render('products/index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Products - Online Store';
    viewData['subtitle'] = 'List of products';
    viewData['products'] = await this.productsService.findAll();

    return {
      viewData: viewData,
    };
  }

  @Get('/:id')
  //@Render('products/show')
  async show(@Param() params, @Res() res) {
    //const product = ProductsController.products[params.id - 1];
    const product = await this.productsService.findOne(params.id);
    console.log('product => ', product);
    if (product === undefined) {
      return res.redirect('/products');
    }
    const viewData = [];
    viewData['title'] = product.getName + ' - Online Store';
    viewData['subtitle'] = product.getName + ' - Product Information';
    viewData['product'] = product;
    // return {
    //   viewData: viewData,
    // };
    return res.render('products/show', { viewData });
  }
}
