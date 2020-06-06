import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertDefaultTags1582024286636 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `INSERT INTO "tags" ("code", "description", "color", "isDefault") values ('🏗', '[shortcut: :building_construction:] If something is wrong with the backend architecture', '#4287f5', true)`,
    );
    await queryRunner.query(
      `INSERT INTO "tags" ("code", "description", "color", "isDefault") values ('📱', '[shortcut: :iphone:] If something is wrong with the front end architecture', '#42c8f5', true)`,
    );
    await queryRunner.query(
      `INSERT INTO "tags" ("code", "description", "color", "isDefault") values ('🏷', '[shortcut: :label:] If something is wrong with the typing', '#a73eed', true)`,
    );
    await queryRunner.query(
      `INSERT INTO "tags" ("code", "description", "color", "isDefault") values ('✅', '[shortcut: :white_check_mark:] If something is wrong with the tests', '#3be36b', true)`,
    );
    await queryRunner.query(
      `INSERT INTO "tags" ("code", "description", "color", "isDefault") values ('♻️', '[shortcut: :recycle:] If the refacto commit is wrong', '#faf320', true)`,
    );
    await queryRunner.query(
      `INSERT INTO "tags" ("code", "description", "color", "isDefault") values ('🔖', '[shortcut: :bookmark:] If the naming feels wrong', '#fc1ed0', true)`,
    );
    await queryRunner.query(
      `INSERT INTO "tags" ("code", "description", "color", "isDefault") values (':readable:', 'If something can improve readability', '#f5972c', true)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM "tags" WHERE "isDefault" = true`);
  }
}
