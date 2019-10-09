import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  description: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;
}