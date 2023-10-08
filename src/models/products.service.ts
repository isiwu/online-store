import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.productsRepository.find();
  }

  findOne(id: string) {
    return this.productsRepository.findOne({
      where: {
        id: Number(id),
      },
    });
  }

  async findByIds(ids: string[]) {
    const entities = [];
    for (let i = 0; i < ids.length; i++) {
      const entity = await this.productsRepository.findBy({
        id: Number(ids[i]),
      });
      entity && entities.push(...entity);
    }
    //return this.productsRepository.findBy({id})
    return entities;
  }

  createOrUpdate(product: Product) {
    return this.productsRepository.save(product);
  }

  async remove(id: string) {
    await this.productsRepository.delete(id);
  }
}
