import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Customer } from '../entities/customer.entity';
import { Repository } from 'typeorm';

import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}
  private counterId = 1;
  private customers: Customer[] = [];

  findAll() {
    return this.customerRepo.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOneBy({ id: id });
    if (!customer) {
      throw new NotFoundException(`customer #${id} not found`);
    }
    return customer;
  }

  create(data: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create(data);
    return this.customerRepo.save(newCustomer);
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.customerRepo.findOneBy({ id: id });
    if (!customer) {
      throw new NotFoundException(`customer #${id} not found`);
    }
    this.customerRepo.merge(customer, changes);

    return this.customerRepo.save(customer);
  }

  async remove(id: number) {
    const customer = await this.customerRepo.findOneBy({ id: id });
    if (!customer) {
      throw new NotFoundException(`customer #${id} not found`);
    }
    return this.customerRepo.delete(id);
  }
}
