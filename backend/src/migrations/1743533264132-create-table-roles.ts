import { BaseMigration } from '@src/database/baseMigration';
import { QueryRunner } from 'typeorm';

export class CreateTableRole1706110083162 extends BaseMigration {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.applySchema(queryRunner);
    await queryRunner.query(`
        CREATE TABLE roles (
          id               UUID DEFAULT uuid_generate_v4()       NOT NULL,
          name             VARCHAR                               NOT NULL,
          description      VARCHAR                               NOT NULL,
          created_date     TIMESTAMP   DEFAULT current_timestamp NOT NULL,
          updated_date     TIMESTAMP,
          deleted_date     TIMESTAMP,
          CONSTRAINT pk_roles PRIMARY KEY (id)
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.applySchema(queryRunner);
    await queryRunner.query(`DROP TABLE roles;`);
  }
}
