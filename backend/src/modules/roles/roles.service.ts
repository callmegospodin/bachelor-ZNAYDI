import { Injectable, Logger } from '@nestjs/common';

import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);
  constructor(private readonly roleRepository: RolesRepository) {}
}
