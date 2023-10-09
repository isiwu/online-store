import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  balance: number;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  getId() {
    return this.id;
  }
  setId(id: number) {
    this.id = id;
  }

  getName() {
    return this.name;
  }
  setName(name: string) {
    this.name = name;
  }

  getEmail() {
    return this.email;
  }
  setEmail(email: string) {
    this.email = email;
  }

  getPassword() {
    return this.password;
  }
  setPassword(password: string) {
    this.password = password;
  }

  getRole() {
    return this.role;
  }
  setRole(role: string) {
    this.role = role;
  }

  getBalance() {
    return this.balance;
  }
  setBalance(balance: number) {
    this.balance = balance;
  }

  getOrders() {
    return this.orders;
  }
  setOrders(orders: Order[]) {
    this.orders = orders;
  }
}
