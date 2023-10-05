import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  price: number;

  getId() {
    return this.id;
  }
  setId(id: number) {
    this.id = id;
  }

  getName() {
    return this.name.toUpperCase();
  }
  setName(name: string) {
    this.name = name;
  }

  getDescription() {
    return this.description;
  }
  setDescription(desc: string) {
    this.description = desc;
  }

  getImage() {
    return this.image;
  }
  setImage(image: string) {
    this.image = image;
  }

  getPrice() {
    return this.price;
  }
  setPrice(price: number) {
    this.price = price;
  }
}
