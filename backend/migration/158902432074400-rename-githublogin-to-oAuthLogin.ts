import { MigrationInterface, QueryRunner } from 'typeorm';

export class renameGithubloginToLogin1589024320744 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "tags" RENAME COLUMN "githubLogin" TO "oAuthLogin"`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "tags" RENAME COLUMN "oAuthLogin" TO "githubLogin"`);
  }
}
