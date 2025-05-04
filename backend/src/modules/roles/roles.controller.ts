import { Controller, Logger } from '@nestjs/common';

@Controller('roles')
export class RolesController {
  private readonly logger = new Logger(RolesController.name);
  constructor() {}
}
