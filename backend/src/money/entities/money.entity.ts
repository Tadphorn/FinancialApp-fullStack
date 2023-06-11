import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Money {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  genres: string;

  @Column()
  amount: number;
}
