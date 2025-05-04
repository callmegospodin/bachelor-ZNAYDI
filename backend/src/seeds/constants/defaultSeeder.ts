import { FollowersList } from '@modules/folowers/entities/followersList.entity';
import { Role } from '@modules/roles/entities/role.entity';
import { User } from '@modules/users/entities/user.entity';

export const seedRoles: Partial<Role>[] = [
  {
    id: '01ed41cf-e065-4ef9-b3c7-b47055808f0a',
    name: 'administrator',
    description: 'The Administrator role has full access to all system features and settings',
    createdAt: new Date('2025-03-17T15:41:48.023Z').toISOString(),
    updatedAt: null,
    deletedAt: null,
    rolesPermissions: [],
  },
  {
    id: '2b1e8b62-a6cd-4665-b18d-2e3638347cff',
    name: 'user',
    description: 'The User role has limited access.',
    createdAt: new Date('2025-03-17T15:41:48.023Z').toISOString(),
    updatedAt: null,
    deletedAt: null,
    rolesPermissions: [],
  },
  {
    id: '4a67bc7b-8605-47e3-94f4-9229af841fe4',
    name: 'organizer',
    description: 'The Organizer role has access to all features and settings related to events.',
    createdAt: new Date('2025-03-17T15:41:48.023Z').toISOString(),
    updatedAt: null,
    deletedAt: null,
    rolesPermissions: [],
  },
];

export const seedFollowerList: FollowersList[] = [
  {
    id: '4bbf2352-90cc-423e-b4a2-85d4afac4f23',
    createdAt: new Date('2025-03-17T15:41:48.023Z').toISOString(),
    updatedAt: null,
    followersUsers: [],
  },
];

export const seedUser: Partial<User>[] = [
  {
    id: 'c05dc95c-ea95-4059-b33c-e5ad1e2839ad',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+15551234567',
    age: 28,
    about: 'Software engineer with a passion for open-source technologies and clean code.',
    city: 'San Francisco',
    photoUrl: 'https://example.com/photos/johndoe.jpg',
    password: '$argon2id$v=19$m=65536,t=3,p=4$zjYa4x4BV6rZg1JSWiuujg$vJa/uupjzGZBuBGnxJ3DeusbImJSuoaDOMNgI9MiMwo', //! password: 111111
    createdAt: new Date('2025-03-17T15:41:48.023Z').toISOString(),
    roleId: seedRoles[0].id,
    followersListId: seedFollowerList[0].id,
    updatedAt: null,
    deletedAt: null,
  },
];
