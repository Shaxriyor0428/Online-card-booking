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
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Card } from './entities/card.entity';
import { AdminAccessTokenGuard } from '../common/guards/access_token.guard';
import { Public } from '../common/decorators/is-public.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
@UseGuards(AdminAccessTokenGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a Card' })
  @ApiResponse({
    status: 201,
    description: 'The card has been successfully created',
    type: Card,
  })
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Public()
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Retrieve all Cards' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved list of all Cards',
    type: [Card],
  })
  findAll() {
    return this.cardsService.findAll();
  }

  @Public()
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get card by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the Card',
    type: Card,
  })
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Card by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the Card',
    type: Card,
  })
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(+id, updateCardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Card by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the Card',
  })
  remove(@Param('id') id: string) {
    return this.cardsService.remove(+id);
  }
}
