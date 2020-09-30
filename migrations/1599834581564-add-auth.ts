import {MigrationInterface, QueryRunner} from "typeorm";

export class addAuth1599834581564 implements MigrationInterface {
    name = 'addAuth1599834581564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "lastName" TO "password"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(70)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "password" TO "lastName"`);
    }

}
