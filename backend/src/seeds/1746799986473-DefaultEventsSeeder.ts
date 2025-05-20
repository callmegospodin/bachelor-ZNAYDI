/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

import { seedEvents } from './constants/defaultSeeder';

export class DefaultEventsSeeder1746799986473 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const mappedEvents = seedEvents
      .map((event) => {
        return `('${event.id}', '${event.name}', '${event.description}', '${event.content}', '${event.price}', '${event.dateTime}', '${event.type}', '${event.city}', '${event.address}', '${event.participants}', '${event.rating}', '${event.photoUrl}', '${event.categoryId}', '${event.createdAt}')`;
      })
      .join(',\n');

    await queryRunner.query(`
        INSERT INTO events (id, name, description, content, price, date_time, type, city, address, participants, rating, photo_url, category_id, created_at)
        VALUES
        ${mappedEvents};
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const eventsToDelete = seedEvents
      .map((event) => {
        return `'${event.id}'`;
      })
      .join();

    await queryRunner.query(`
        DELETE FROM events 
        WHERE id IN (${eventsToDelete});
      `);
  }
}
