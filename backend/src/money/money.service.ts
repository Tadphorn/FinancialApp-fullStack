import { Injectable } from '@nestjs/common';
import { CreateMoneyDto } from './dto/create-money.dto';
import { UpdateMoneyDto } from './dto/update-money.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Money } from './entities/money.entity';

@Injectable()
export class MoneyService {
  constructor(
    @InjectRepository(Money)
    private MoneysRepository: Repository<Money>,
  ) {}

  create(createMoneyDto: CreateMoneyDto) {
    return this.MoneysRepository.save(createMoneyDto);
  }

  findAll(): Promise<Money[]> {
    return this.MoneysRepository.find();
  }

  findOne(id: number): Promise<Money | null> {
    return this.MoneysRepository.findOne({ where: { id } });
  }

  update(id: number, updateMoneyDto: UpdateMoneyDto) {
    return this.MoneysRepository.update(id, updateMoneyDto);
  }

  remove(id: number) {
    return this.MoneysRepository.delete(id);
  }
}
