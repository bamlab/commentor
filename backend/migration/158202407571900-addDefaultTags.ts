import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDefaultTags1582024075719 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "tags" ADD "isDefault" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "tags" ALTER COLUMN "githubLogin" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "tags" ALTER COLUMN "githubLogin" DROP DEFAULT`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "tags" ALTER COLUMN "githubLogin" SET DEFAULT 'sraikimaxime'`,
    );
    await queryRunner.query(`ALTER TABLE "tags" ALTER COLUMN "githubLogin" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "isDefault"`);
  }
}
