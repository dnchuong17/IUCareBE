import { MigrationInterface, QueryRunner } from "typeorm";

export class DONETEST1733426355617 implements MigrationInterface {
    name = 'DONETEST1733426355617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medical_record" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medical_record" ADD "test" character varying`);
    }

}
