import {MigrationInterface, QueryRunner} from "typeorm";

export class second1599757665437 implements MigrationInterface {
    name = 'second1599757665437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "lastName" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
    }

}
