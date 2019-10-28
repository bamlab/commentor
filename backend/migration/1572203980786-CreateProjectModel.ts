import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProjectModel1572203980786 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tags" ALTER COLUMN "color" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "tags" ALTER COLUMN "color" SET DEFAULT '#fff'`);
        await queryRunner.query(`DROP TABLE "projects"`);
    }

}
