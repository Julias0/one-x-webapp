import { MeetingDto } from './meeting.dto';

export interface NextStepDto {
  _id?: string;
  content: string;
  owner: string;
  meeting: MeetingDto;
  status: 'PENDING' | 'COMPLETE';
}