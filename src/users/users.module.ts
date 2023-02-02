import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';

import { ProductsModule } from '../products/products.module';
import { LinesOrder } from './entities/lines-order.entity';
import { Order } from './entities/order.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { LineOrderController } from './controllers/line-order.controller';
import { LineOrderService } from './services/line-order.service';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, LinesOrder, Order]),
  ],
  controllers: [
    CustomerController,
    UsersController,
    OrdersController,
    LineOrderController,
    ProfileController,
  ],
  providers: [CustomersService, UsersService, OrdersService, LineOrderService],
  exports: [LineOrderService, UsersService],
})
export class UsersModule {}
