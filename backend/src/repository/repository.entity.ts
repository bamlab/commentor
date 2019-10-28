import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('repositories')
export class Repository {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;
}
