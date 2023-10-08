import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
  Req,
} from '@nestjs/common';
import { Product } from 'src/models/product.entity';
import { ProductsService } from 'src/models/products.service';

@Controller('cart')
export class CartController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  @Render('cart/index')
  async index(@Req() req) {
    let total = 0;
    let productInCart = [];
    const productInSession = req.session.products;
    //console.log('product insession => ', productInSession);

    // productInCart = await this.productsService.findByIds(
    //   Object.keys(productInSession),
    // );
    // total = Product.sumPricesByQuantities(productInCart, productInSession);
    if (productInSession) {
      productInCart = await this.productsService.findByIds(
        Object.keys(productInSession),
      );
      //console.log('products in cart => ', productInCart);
      total = Product.sumPricesByQuantities(productInCart, productInSession);
    }

    const viewData = [];
    viewData['title'] = 'Cart - Online Store';
    viewData['subtitle'] = 'SHopping Cart';
    viewData['total'] = total;
    viewData['productsInCart'] = productInCart;

    return {
      viewData,
    };
  }

  @Post('/add/:id')
  @Redirect('/cart')
  add(@Param('id') id: number, @Body() body, @Req() req) {
    let productsInSession = req.session.products;
    if (!productsInSession) {
      productsInSession = {};
    }
    productsInSession[id] = body.quantity;
    req.session.products = productsInSession;
  }

  @Get('/delete')
  @Redirect('/cart/')
  delete(@Req() request) {
    request.session.products = null;
  }
}
