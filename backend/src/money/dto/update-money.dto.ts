import { PartialType } from '@nestjs/mapped-types';
import { CreateMoneyDto } from './create-money.dto';

export class UpdateMoneyDto extends PartialType(CreateMoneyDto) {}
