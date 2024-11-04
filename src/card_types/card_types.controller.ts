import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CardTypesService } from './card_types.service';
import { CreateCardTypeDto } from './dto/create-card_type.dto';
import { UpdateCardTypeDto } from './dto/update-card_type.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CardType } from './entities/card_type.entity';
import { AccessTokenGuard } from '../common/guards/access_token.guard';

@UseGuards(AccessTokenGuard)
@ApiTags('Card Types')
@Controller('card-types')
export class CardTypesController {
  constructor(private readonly cardTypesService: CardTypesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new card type' })
  @ApiResponse({
    status: 201,
    description: 'The card type has been successfully created.',
    type: CardType,
  })
  create(@Body() createCardTypeDto: CreateCardTypeDto) {
    return this.cardTypesService.create(createCardTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all card types' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all card types.',
    type: [CardType],
  })
  findAll() {
    return this.cardTypesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a card type by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved card type.',
    type: CardType,
  })
  findOne(@Param('id') id: string) {
    return this.cardTypesService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a card type by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated card type.',
    type: CardType,
  })
  update(
    @Param('id') id: string,
    @Body() updateCardTypeDto: UpdateCardTypeDto,
  ) {
    return this.cardTypesService.update(+id, updateCardTypeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a card type by ID' })
  @ApiResponse({ status: 204, description: 'Successfully deleted card type.' })
  remove(@Param('id') id: string) {
    return this.cardTypesService.remove(+id);
  }
}
