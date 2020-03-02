import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  color: string;

  @Column({ nullable: true })
  githubLogin: string;

  @Column({ nullable: false, default: () => false })
  isDefault: boolean;

  @Column({ nullable: true })
  repositoryId: number;

  @Column({ nullable: false })
  externalLink: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;
}
