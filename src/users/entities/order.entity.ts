import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { User } from './user.entity';
import { Customer } from './customer.entity';
import { LinesOrder } from './lines-order.entity';
import { Expose } from 'class-transformer';

export enum statusOrder {
  ENPROCESO = 'En Proceso',
  FINALIZADA = 'Finalizado',
  ANULADA = 'Anulado',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updateAt: Date;

  @Column({
    type: 'enum',
    enum: statusOrder,
    default: statusOrder.ENPROCESO,
  })
  status: statusOrder;

  @Column({ type: 'datetime', default: null })
  dateEnd: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @OneToMany(() => LinesOrder, (lines) => lines.order)
  lines: LinesOrder[];

  @Expose()
  get totalOrder() {
    if (this.lines) {
      return this.lines
        .filter((line) => !!line)
        .reduce((total: number, line) => {
          const totalLine: number = line.price * line.qty;
          return total + totalLine;
        }, 0);
    }
    return 0;
  }
}
