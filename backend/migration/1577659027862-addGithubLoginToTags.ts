import { MigrationInterface, QueryRunner } from 'typeorm';

export class addGithubLoginToTags1577659027862 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "tags" ADD "githubLogin" character varying NOT NULL DEFAULT 'sraikimaxime'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "githubLogin"`);
  }
}
