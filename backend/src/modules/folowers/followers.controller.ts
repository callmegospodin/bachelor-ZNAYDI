import { Controller, Logger } from '@nestjs/common';

@Controller('followers')
export class FollowersController {
  private readonly logger = new Logger(FollowersController.name);
  constructor() {}
}
