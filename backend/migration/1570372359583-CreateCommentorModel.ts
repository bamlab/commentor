import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCommentorModel1570372359583 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" SERIAL NOT NULL, "body" character varying NOT NULL, "filePath" character varying NOT NULL, "url" character varying NOT NULL, "commentor" character varying NOT NULL, "requester" character varying NOT NULL, "pullRequestUrl" character varying NOT NULL, "repositoryId" integer NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "comments"`);
  }
}
