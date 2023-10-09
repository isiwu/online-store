import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.entity';
import { User } from './user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => Item, (item) => item.order)
  items: Item[];

  getId() {
    return this.id;
  }
  setId(id: number) {
    this.id = id;
  }

  getTotal() {
    return this.total;
  }
  setTotal(total: number) {
    this.total = total;
  }

  getDate() {
    return this.date;
  }
  setDate(date: Date) {
    this.date = date;
  }

  getUser() {
    return this.user;
  }
  setUser(user: User) {
    this.user = user;
  }
}
