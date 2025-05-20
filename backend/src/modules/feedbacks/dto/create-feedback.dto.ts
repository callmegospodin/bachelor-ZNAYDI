import { IsString, IsUUID } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  text: string;

  @IsUUID('all')
  @IsString()
  eventId: string;
}
