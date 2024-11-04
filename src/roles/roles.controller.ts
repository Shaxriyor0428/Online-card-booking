import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './entities/role.entity';
import { AccessTokenGuard } from '../common/guards/access_token.guard';

@UseGuards(AccessTokenGuard)
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Role' })
  @ApiResponse({
    status: 201,
    description: 'The role has been created successfully',
    type: Role,
  })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of Roles' })
  @ApiResponse({
    status: 200,
    description: 'List of roles',
    type: [Role],
  })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get role by Id' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrevied role by ID',
    type: Role,
  })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update role by Id' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated role by ID',
    type: Role,
  })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete role by Id' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted role by ID',
  })
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
