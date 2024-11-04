import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {}
  async create(createRoleDto: CreateRoleDto) {
    const name = createRoleDto.name.toUpperCase();
    const old_role = await this.roleRepo.findOne({
      where: { name },
    });
    if (old_role) {
      throw new BadRequestException('This role allready exists');
    }
    return this.roleRepo.save({ name });
  }

  findAll() {
    return this.roleRepo.find();
  }

  findOne(id: number) {
    return this.roleRepo.findOne({ where: { id } });
  }

  findByName(name: string) {
    return this.roleRepo.findOne({ where: { name } });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepo.update(id, updateRoleDto);
  }

  remove(id: number) {
    return this.roleRepo.delete(id);
  }
}
