import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [];

  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const categorie = await this.categoryRepo.findOne({
      where: { id: id },
      relations: ['products'],
    });
    if (!categorie) {
      throw new NotFoundException(`category #${id} not found`);
    }
    return categorie;
  }

  create(data: CreateCategoryDto) {
    this.counterId = this.counterId + 1;
    const newCategory = this.categoryRepo.create(data);
    return this.categoryRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOneBy({ id: id });
    if (!category) {
      throw new NotFoundException(`category #${id} not found`);
    }
    this.categoryRepo.merge(category, changes);

    return this.categoryRepo.save(category);
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findOneBy({ id: id });
    if (!category) {
      throw new NotFoundException(`category #${id} not found`);
    }
    return this.categoryRepo.delete(id);
  }
}
