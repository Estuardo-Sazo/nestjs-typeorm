import { Product } from '../../products/entities/product.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Order } from './order.entity';

import { Exclude } from 'class-transformer';

@Entity()
export class LinesOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.lines)
  order: Order;

  @ManyToOne(() => Product)
  product: Product;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Column({ type: 'int' })
  qty: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  cost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  subtotal: number;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamp',
  })
  createAt: Date;
  @Exclude()
  @UpdateDateColumn({
    type: 'timestamp',
  })
  updateAt: Date;
}
