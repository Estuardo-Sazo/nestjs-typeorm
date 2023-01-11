import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [];

  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  findAll() {
    return this.brandRepo.find();
  }

  async findOne(id: number) {
    const brand = await this.brandRepo.findOne({
      where: { id: id },
      relations: ['products'],
    });
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  create(data: CreateBrandDto) {
    /* his.counterId = this.counterId + 1;
    const newBrand = {
      id: this.counterId,
      ...data,
    }; */
    const newBrand = this.brandRepo.create(data);
    return this.brandRepo.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.brandRepo.findOneBy({ id: id });
    if (!brand) {
      throw new NotFoundException(`brand #${id} not found`);
    }
    this.brandRepo.merge(brand, changes);

    return this.brandRepo.save(brand);
  }

  async remove(id: number) {
    const brand = await this.brandRepo.findOneBy({ id: id });
    if (!brand) {
      throw new NotFoundException(`brand #${id} not found`);
    }
    return this.brandRepo.delete(id);
  }
}
