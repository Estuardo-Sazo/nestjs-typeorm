import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateOrderLineDto, UpdateOrderLineDto } from '../dtos/line-order.dto';

import { LineOrderService } from '../services/line-order.service';

@ApiTags('line-order')
@Controller('line-order')
export class LineOrderController {
  constructor(private lineOrderService: LineOrderService) {}
  @Post()
  async create(@Body() payload: CreateOrderLineDto) {
    return await this.lineOrderService.create(payload);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderLineDto,
  ) {
    return await this.lineOrderService.update(id, payload);
  }

  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.lineOrderService.remove(id);
  }
}
