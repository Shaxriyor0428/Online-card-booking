import { PartialType } from '@nestjs/swagger';
import { CreateCardTypeDto } from './create-card_type.dto';

export class UpdateCardTypeDto extends PartialType(CreateCardTypeDto) {}
