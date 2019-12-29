import { MigrationInterface, QueryRunner } from 'typeorm';

export class deleteRepositoryModel1577656283461 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "repositories"`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "repositories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_ef0c358c04b4f4d29b8ca68ddff" PRIMARY KEY ("id"))`,
    );
  }
}
