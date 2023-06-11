import { Module } from '@nestjs/common';
import { MoneyService } from './money.service';
import { MoneyController } from './money.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Money } from '../money/entities/money.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Money])],
  controllers: [MoneyController],
  providers: [MoneyService],
})
export class MoneyModule {}
