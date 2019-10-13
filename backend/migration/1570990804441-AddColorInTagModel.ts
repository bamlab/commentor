import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColorInTagModel1570990804441 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "tags" ADD "color" character varying NOT NULL DEFAULT '#fff'`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "color"`, undefined);
  }
}
