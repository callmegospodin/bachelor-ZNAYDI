import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './entities/role.entity';

@Injectable()
export class RolesRepository extends Repository<Role> {
  private readonly logger = new Logger(RolesRepository.name);

  constructor(@InjectRepository(Role) repository: Repository<Role>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
