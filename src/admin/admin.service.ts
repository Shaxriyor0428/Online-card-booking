import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepe: Repository<Admin>,
    private readonly roleService: RolesService,
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const admin = await this.adminRepe.findOne({
      where: {
        email: createAdminDto.email,
      },
    });
    const old_admin = await this.adminRepe.findOne({
      where: { phone_number: createAdminDto.phone_number },
    });
    if (admin || old_admin) {
      throw new ForbiddenException('Admin already exists');
    }
    const role = await this.roleService.findByName(
      createAdminDto.role.toUpperCase(),
    );
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const hashed_password = await hash(createAdminDto.password, 7);
    const newAdmin = await this.adminRepe.save({
      ...createAdminDto,
      hashed_password,
    });

    if (!newAdmin) {
      throw new ForbiddenException('Admin error');
    }
    return newAdmin;
  }

  findAll() {
    return this.adminRepe.find();
  }

  findOne(id: number) {
    return this.adminRepe.findOne({ where: { id } });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminRepe.update(id, updateAdminDto);
  }

  remove(id: number) {
    return this.adminRepe.delete(id);
  }
}
