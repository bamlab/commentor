import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTagModel1570641501753 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "tags"`, undefined);
    }

}
