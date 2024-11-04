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
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Region } from './entities/region.entity';
import { AdminAccessTokenGuard } from '../common/guards/access_token.guard';
import { AuthGuard } from '../common/guards/auth.guard';

@ApiTags('Regions')
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @UseGuards(AdminAccessTokenGuard)
  @Post()
  @ApiOperation({ summary: 'Create region' })
  @ApiResponse({
    status: 201,
    description: 'Created Region',
    type: Region,
  })
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionsService.create(createRegionDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get list of Regions' })
  @ApiResponse({
    status: 200,
    description: 'List of regions',
    type: [Region],
  })
  findAll() {
    return this.regionsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get region By ID' })
  @ApiResponse({
    status: 200,
    description: 'Region has been successfully recieved',
  })
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(+id);
  }

  @UseGuards(AdminAccessTokenGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update region by ID' })
  @ApiResponse({
    status: 200,
    description: 'Updated region',
    type: Region,
  })
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionsService.update(+id, updateRegionDto);
  }

  @UseGuards(AdminAccessTokenGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete region By ID' })
  @ApiResponse({
    status: 200,
    description: 'Deleted successfully',
  })
  remove(@Param('id') id: string) {
    return this.regionsService.remove(+id);
  }
}
