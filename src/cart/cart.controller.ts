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
} from '@nestjs/common';
import { Item } from 'src/models/item.entity';
import { Order } from 'src/models/order.entity';
import { OrdersService } from 'src/models/orders.service';
import { Product } from 'src/models/product.entity';
import { ProductsService } from 'src/models/products.service';
import { UsersService } from 'src/models/users.service';

@Controller('cart')
export class CartController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService,
  ) {}

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

  @Get('/purchase')
  async purchase(@Req() req, @Res() res) {
    if (!req.session.user) {
      res.redirect('/auth/login');
    } else if (!req.session.products) {
      res.redirect('/cart');
    } else {
      const user = await this.usersService.findOne(req.session.user);
      const productsInSession = req.session.products;
      const productsInCart = await this.productsService.findByIds(
        Object.keys(productsInSession),
      );

      let total = 0;
      const items: Item[] = [];
      for (let i = 0; i < productsInCart.length; i++) {
        const item = new Item();
        const quantity = productsInSession[productsInCart[i].getId()];
        item.setQuantity(quantity);
        item.setPrice(productsInCart[i].getPrice());
        item.setProduct(productsInCart[i]);

        items.push(item);
        total = total + productsInCart[i].getPrice() * quantity;
      }

      const newOrder = new Order();
      newOrder.setTotal(total);
      newOrder.setItems(items);
      newOrder.setUser(user);

      const order = await this.ordersService.createOrUpdate(newOrder);
      const newBalance = user.getBalance() - total;
      await this.usersService.updateBalance(user.getId(), newBalance);
      req.session.products = null;

      const viewData = [];
      viewData['title'] = 'Purchase - Online Store';
      viewData['subtitle'] = 'Purchase Status';
      viewData['orderId'] = order.getId();

      return res.render('cart/purchase', { viewData: viewData });
    }
  }
}
