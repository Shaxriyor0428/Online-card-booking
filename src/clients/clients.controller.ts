import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Clients } from './entities/client.entity';
import { ClientAccessTokenGuard } from '../common/guards/client.access_token.guard';
import { AuthGuard } from '../common/guards/auth.guard';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  // @Post('add-client')
  // async create(
  //   @Res({ passthrough: true }) res: Response,
  //   @Body()
  //   createClientDto: CreateClientDto,
  // ) {
  //   return await this.clientsService.create(createClientDto);
  // }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all Clients' })
  @ApiResponse({
    status: 200,
    description: 'List of clients',
    type: [Clients],
  })
  findAll() {
    return this.clientsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get client by ID' })
  @ApiResponse({
    status: 200,
    description: 'Client has been recieved successfully',
    type: Clients,
  })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @UseGuards(ClientAccessTokenGuard)
  @Patch(':id')
  @ApiOperation({
    summary: 'Update client by Id',
  })
  @ApiResponse({
    status: 200,
    description: 'Updated successfully',
    type: Clients,
  })
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @UseGuards(ClientAccessTokenGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete client by ID' })
  @ApiResponse({
    status: 200,
    description: 'Deleted successfully',
  })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
