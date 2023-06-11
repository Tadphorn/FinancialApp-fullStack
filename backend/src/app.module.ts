import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MoneyModule } from './money/money.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Money } from './money/entities/money.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '022546Ochi',
      database: 'financial',
      entities: [Money],
      synchronize: true,
    }),
    MoneyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
