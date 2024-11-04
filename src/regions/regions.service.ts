import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region) private readonly regionRepo: Repository<Region>,
  ) {}
  async create(createRegionDto: CreateRegionDto) {
    const region = await this.regionRepo.findOne({
      where: { name: createRegionDto.name },
    });
    if (region) {
      throw new ForbiddenException('Region already exists');
    }
    return this.regionRepo.save(createRegionDto);
  }

  findAll() {
    return this.regionRepo.find();
  }

  findOne(id: number) {
    return this.regionRepo.findOne({ where: { id } });
  }

  update(id: number, updateRegionDto: UpdateRegionDto) {
    return this.regionRepo.update(id, updateRegionDto);
  }

  remove(id: number) {
    return this.regionRepo.delete(id);
  }
}
