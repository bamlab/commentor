import { MigrationInterface, QueryRunner } from 'typeorm';

export class replaceColonsByEmojisForKonectomMobile1589313377427 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `UPDATE comments SET body = REPLACE(body, ':iphone:', '📱') WHERE "comments"."repositoryId"= 17424927`,
    );
    await queryRunner.query(
      `UPDATE comments SET body = REPLACE(body, ':white_check_mark:', '✅') WHERE "comments"."repositoryId"= 17424927`,
    );
    await queryRunner.query(
      `UPDATE comments SET body = REPLACE(body, ':label:', '🏷') WHERE "comments"."repositoryId"= 17424927`,
    );
    await queryRunner.query(
      `UPDATE comments SET body = REPLACE(body, ':building_construction:', '🏗') WHERE "comments"."repositoryId"= 17424927`,
    );
    await queryRunner.query(
      `UPDATE comments SET body = REPLACE(body, ':recycle:', '♻️') WHERE "comments"."repositoryId"= 17424927`,
    );
    await queryRunner.query(
      `UPDATE comments SET body = REPLACE(body, 'naming', '🔖') WHERE "comments"."repositoryId"= 17424927`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `UPDATE comments SET body = REPLACE(body, '📱', ':iphone:') WHERE "comments"."repositoryId"= 17424927`,
    );
    await queryRunner.query(
      `UPDATE comments SET body = REPLACE(body, '✅', ':white_check_mark:') WHERE "comments"."repositoryId"= 17424927`,
    );
    await queryRunner.query(
      `UPDATE comments SET body = REPLACE(body, '🏷', ':label:') WHERE "comments"."repositoryId"= 17424927`,
    );
    await queryRunner.query(
      `UPDATE comments SET body = REPLACE(body, '🏗', ':building_construction:') WHERE "comments"."repositoryId"= 17424927`,
    );
    await queryRunner.query(
      `UPDATE comments SET body = REPLACE(body, '🔖', ':naming:') WHERE "comments"."repositoryId"= 17424927`,
    );
  }
}
