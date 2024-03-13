import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1710188990449 implements MigrationInterface {
    name = 'Default1710188990449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensor_data" DROP CONSTRAINT "REL_7644419e32b5c253d2bb101f08"`);
        await queryRunner.query(`ALTER TABLE "sensor_data" ADD CONSTRAINT "FK_7644419e32b5c253d2bb101f086" FOREIGN KEY ("sensorId") REFERENCES "sensor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensor_data" DROP CONSTRAINT "FK_7644419e32b5c253d2bb101f086"`);
        await queryRunner.query(`ALTER TABLE "sensor_data" ADD CONSTRAINT "REL_7644419e32b5c253d2bb101f08" UNIQUE ("sensorId")`);
    }

}
