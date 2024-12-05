import { MigrationInterface, QueryRunner } from "typeorm";

export class TEST1733426161940 implements MigrationInterface {
    name = 'TEST1733426161940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medical_record" ADD "test" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medical_record" DROP COLUMN "test"`);
    }

}
