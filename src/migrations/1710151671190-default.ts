import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1710151671190 implements MigrationInterface {
    name = 'Default1710151671190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sensor" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_ccc38b9aa8b3e198b6503d5eee9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sensor_data" ("id" SERIAL NOT NULL, "temperature" integer NOT NULL, "humidity" integer NOT NULL, "windspeed" integer NOT NULL, "recordedTime" TIMESTAMP NOT NULL, "sensorId" integer, CONSTRAINT "REL_7644419e32b5c253d2bb101f08" UNIQUE ("sensorId"), CONSTRAINT "PK_1c0b5610a1a0f690d40239d408d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sensor_data" ADD CONSTRAINT "FK_7644419e32b5c253d2bb101f086" FOREIGN KEY ("sensorId") REFERENCES "sensor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensor_data" DROP CONSTRAINT "FK_7644419e32b5c253d2bb101f086"`);
        await queryRunner.query(`DROP TABLE "sensor_data"`);
        await queryRunner.query(`DROP TABLE "sensor"`);
    }

}
