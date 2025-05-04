import { BaseMigration } from '@src/database/baseMigration';
import { QueryRunner } from 'typeorm';

export class CreateTableRolesPermissions1743533740080 extends BaseMigration {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.applySchema(queryRunner);
    await queryRunner.query(`
        CREATE TABLE roles_permissions (
          role_id               UUID DEFAULT uuid_generate_v4()       NOT NULL,
          created_date     TIMESTAMP   DEFAULT current_timestamp      NOT NULL,
          updated_date     TIMESTAMP,
          deleted_date     TIMESTAMP,
          CONSTRAINT pk_roles_permissions PRIMARY KEY (role_id)
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.applySchema(queryRunner);
    await queryRunner.query(`DROP TABLE permissions;`);
  }
}
