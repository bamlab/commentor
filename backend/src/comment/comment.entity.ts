import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  body: string;

  @Column({ nullable: false })
  filePath: string;

  @Column({ nullable: false })
  url: string;

  @Column({ nullable: false })
  commentor: string;

  @Column({ nullable: false })
  requester: string;

  @Column({ nullable: false })
  pullRequestUrl: string;

  @Column({ nullable: false })
  repositoryId: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;
}
