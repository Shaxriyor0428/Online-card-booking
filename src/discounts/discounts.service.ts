import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private discountRepo: Repository<Discount>,
  ) {}
  create(createDiscountDto: CreateDiscountDto) {
    return this.discountRepo.save(createDiscountDto);
  }

  findAll() {
    return this.discountRepo.find();
  }

  findOne(id: number) {
    return this.discountRepo.findOne({ where: { id } });
  }

  update(id: number, updateDiscountDto: UpdateDiscountDto) {
    return this.discountRepo.update(id, updateDiscountDto);
  }

  remove(id: number) {
    return this.discountRepo.delete(id);
  }
}
