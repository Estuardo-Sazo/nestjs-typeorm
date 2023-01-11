import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { LinesOrder } from '../entities/lines-order.entity';
import { CreateOrderLineDto, UpdateOrderLineDto } from '../dtos/line-order.dto';
import { Product } from '../../products/entities/product.entity';

@Injectable()
export class LineOrderService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(LinesOrder)
    private lineOrderRepo: Repository<LinesOrder>,
  ) {}

  async create(data: CreateOrderLineDto) {
    const order = await this.orderRepo.findOne({
      where: { id: data.orderId },
    });
    const product = await this.productRepo.findOne({
      where: { id: data.productId },
    });

    const line = new LinesOrder();
    line.order = order;
    line.product = product;
    line.price = data.price;
    line.cost = product.cost;
    line.description = product.name;
    line.qty = data.qty;
    line.subtotal = data.price * data.qty;

    return this.lineOrderRepo.save(line);
  }

  async update(id: number, changes: UpdateOrderLineDto) {
    const line = await this.lineOrderRepo.findOne({ where: { id: id } });
    if (changes.price) {
      line.price = changes.price;
    }
    if (changes.qty) {
      line.qty = changes.qty;
    }

    line.subtotal = line.qty * line.price;
    return this.lineOrderRepo.save(line);
  }

  async remove(id: number) {
    return await this.lineOrderRepo.delete(id);
  }
}
