import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertScissorsAndHammerDefaultTags158203138046799 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `INSERT INTO "tags" ("code", "description", "color", "isDefault") values ('✂', '[shortcut: :scissors:] If the commits are not well defined', '#eb6a2f', true)`,
    );
    await queryRunner.query(
      `INSERT INTO "tags" ("code", "description", "color", "isDefault") values ('🔨', 'If there is a generic mistake that cannot be attribued to a specific category', '#fcc56d', true)`,
    );
    await queryRunner.query(
      `INSERT INTO "tags" ("code", "description", "color", "isDefault") values (':todo:', 'If there is a smell in the code but you do not know the standard yet and wish to figure it out with your team later', '#fcc56d', true)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM "tags" WHERE "isDefault" = true AND "code" = '✂'`);
    await queryRunner.query(`DELETE FROM "tags" WHERE "isDefault" = true AND "code" = '🔨'`);
    await queryRunner.query(`DELETE FROM "tags" WHERE "isDefault" = true AND "code" = ':todo:'`);
  }
}
