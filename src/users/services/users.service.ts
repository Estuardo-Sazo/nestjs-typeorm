import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { ProductsService } from './../../products/services/products.service';
import { CustomersService } from '../services/customers.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @Inject('PG') private client: Client,
    @InjectRepository(User) private userRepo: Repository<User>,
    private customersService: CustomersService,
  ) {}

  private counterId = 1;
  private users: User[] = [];

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName);
    return this.userRepo.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
  async findByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email: email });
    if (!user) {
      return false;
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newuser = this.userRepo.create(data);
    const hashPassword = await bcrypt.hash(newuser.password, 10);
    newuser.password = hashPassword;
    if (data.customerId) {
      const customer = await this.customersService.findOne(data.customerId);
      newuser.customer = customer;
    }
    return this.userRepo.save(newuser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`user #${id} not found`);
    }
    this.userRepo.merge(user, changes);

    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`user #${id} not found`);
    }
    return this.userRepo.delete(id);
  }

  /* async getOrderByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  } */

  /* getTasks() {
    return new Promise((resolve, reject) => {
      this.client.query('SELECT * FROM tasks', (err, res) => {
        console.error(err);
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  } */
}
