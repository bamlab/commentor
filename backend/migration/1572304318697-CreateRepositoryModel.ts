import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRepositoryModel1572304318697 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "repositories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_ef0c358c04b4f4d29b8ca68ddff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tags" ALTER COLUMN "color" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "tags" ALTER COLUMN "color" SET DEFAULT '#fff'`);
        await queryRunner.query(`DROP TABLE "repositories"`);
    }

}
