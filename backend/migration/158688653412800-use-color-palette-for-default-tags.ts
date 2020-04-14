import { MigrationInterface, QueryRunner } from 'typeorm';

export class useColorPaletteForDefaultTags158688653412800 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`UPDATE "tags" SET color='#8968BA' where code='🏗';`);
    await queryRunner.query(`UPDATE "tags" SET color='#6C94BA' where code='📱';`);
    await queryRunner.query(`UPDATE "tags" SET color='#F7CDCD' where code='🏷';`);
    await queryRunner.query(`UPDATE "tags" SET color='#4FC1BA' where code='✅';`);
    await queryRunner.query(`UPDATE "tags" SET color='#9FDDDA' where code='♻️';`);
    await queryRunner.query(`UPDATE "tags" SET color='#F1925F' where code='🔖';`);
    await queryRunner.query(`UPDATE "tags" SET color='#979797' where code=':readable:';`);
    await queryRunner.query(`UPDATE "tags" SET color='#E55E5E' where code=':solid:';`);
    await queryRunner.query(`UPDATE "tags" SET color='#FCC760' where code='⚡️';`);
    await queryRunner.query(`UPDATE "tags" SET color='#C7B8DE' where code='✂';`);
    await queryRunner.query(`UPDATE "tags" SET color='#BCCEE0' where code='🔨';`);
    await queryRunner.query(`UPDATE "tags" SET color='#FCE6DB' where code=':todo:';`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
