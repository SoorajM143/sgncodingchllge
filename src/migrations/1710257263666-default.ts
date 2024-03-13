import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1710257263666 implements MigrationInterface {
    name = 'Default1710257263666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensor_data" DROP COLUMN "recordedTime"`);
        await queryRunner.query(`ALTER TABLE "sensor_data" ADD "recordedTime" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensor_data" DROP COLUMN "recordedTime"`);
        await queryRunner.query(`ALTER TABLE "sensor_data" ADD "recordedTime" TIMESTAMP NOT NULL`);
    }

}
