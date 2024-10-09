import { MigrationInterface, QueryRunner } from "typeorm";

export class Car1698321500515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      ` 
        -- Table Definition
        CREATE TABLE "cars" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "name" character varying NOT NULL,
          "seats" integer NOT NULL,
          "price" numeric(10, 2) NOT NULL,
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_cars_id" PRIMARY KEY ("id")
        )
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "cars"`);
  }
}
