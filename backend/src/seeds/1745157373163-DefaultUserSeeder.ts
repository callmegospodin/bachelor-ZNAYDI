/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

import { seedFollowerList, seedRoles, seedUser } from './constants/defaultSeeder';

export class DefaultUserSeeder1745157373163 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const mappedUser = seedUser
      .map((user) => {
        return `('${user.id}', '${user.firstName}', '${user.lastName}', '${user.email}', '${user.phone}', '${user.age}', '${user.about}', '${user.city}', '${user.photoUrl}', '${user.password}', '${user.roleId}', '${user.followersListId}', '${user.createdAt}')`;
      })
      .join();

    const mappedRoles = seedRoles
      .map((role) => {
        return `('${role.id}', '${role.name}', '${role.description}', '${role.createdAt}')`;
      })
      .join(',\n');

    const mappedFollowerList = seedFollowerList
      .map((followerList) => {
        return `('${followerList.id}', '${followerList.createdAt}')`;
      })
      .join();

    await queryRunner.query(`
        INSERT INTO followers_list (id, created_at)
        VALUES
        ${mappedFollowerList};
      `);

    await queryRunner.query(`
      INSERT INTO roles (id, name, description, created_at)
      VALUES
      ${mappedRoles};
    `);

    await queryRunner.query(`
      INSERT INTO users (id, first_name, last_name, email, phone, age, about, city, photo_url, password, role_id, followers_list_id, created_at)
      VALUES
      ${mappedUser};
    `); //password: 111111
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userToDelete = seedUser
      .map((user) => {
        return `'${user.id}'`;
      })
      .join();

    const rolesToDelete = seedRoles
      .map((role) => {
        return `'${role.id}'`;
      })
      .join();

    const followersListToDelete = seedFollowerList
      .map((followerList) => {
        return `'${followerList.id}'`;
      })
      .join();

    await queryRunner.query(`
        DELETE FROM roles 
        WHERE id IN (${rolesToDelete});
      `);

    await queryRunner.query(`
        DELETE FROM users 
        WHERE id IN (${userToDelete});
      `);

    await queryRunner.query(`
        DELETE FROM followers_list 
        WHERE id IN (${followersListToDelete});
      `);
  }
}
