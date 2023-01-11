import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';
import { Customer } from '../entities/customer.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async findAll() {
    return await this.orderRepo.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id: id },
      relations: ['user', 'customer', 'lines', 'lines.product'],
    });
    if (!order) throw new NotFoundException(`Order not found.`);
    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new Order();
    if (data.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: data.customerId },
      });
      order.customer = customer;
    }

    if (data.userId) {
      const user = await this.userRepo.findOne({
        where: { id: data.userId },
      });
      order.user = user;
    }

    return await this.orderRepo.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.findOne(id);

    if (changes.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: changes.customerId },
      });
      order.customer = customer;
    }

    if (changes.userId) {
      const user = await this.userRepo.findOne({
        where: { id: changes.userId },
      });
      order.user = user;
    }
    return await this.orderRepo.save(order);
  }

  async remove(id: number) {
    return await this.orderRepo.delete(id);
  }
}
