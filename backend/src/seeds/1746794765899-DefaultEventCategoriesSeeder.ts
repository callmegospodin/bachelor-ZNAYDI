import { MigrationInterface, QueryRunner } from 'typeorm';

import { seedCategories } from './constants/defaultSeeder';

export class DefaultEventCategoriesSeeder1746794765899 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const mappedCategories = seedCategories
      .map((category) => {
        return `('${category.id}', '${category.name}', '${category.tag}', '${category.createdAt}')`;
      })
      .join(',\n');

    await queryRunner.query(`
        INSERT INTO event_categories (id, name, tag, created_at)
        VALUES
        ${mappedCategories};
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const categoriesToDelete = seedCategories
      .map((category) => {
        return `'${category.id}'`;
      })
      .join();

    await queryRunner.query(`
        DELETE FROM event_categories 
        WHERE id IN (${categoriesToDelete});
      `);
  }
}
