import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertNewDefaultTags1582031380467 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `INSERT INTO "tags" ("code", "description", "color", "isDefault") values (':solid:', 'If the code does not respect the SOLID principles', '#eb6a2f', true)`,
    );
    await queryRunner.query(
      `INSERT INTO "tags" ("code", "description", "color", "isDefault") values ('⚡️', 'If the code could be improved for performance', '#fcc56d', true)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM "tags" WHERE "isDefault" = true AND "code" = ':solid:'`);
    await queryRunner.query(`DELETE FROM "tags" WHERE "isDefault" = true AND "code" = '⚡️'`);
  }
}
