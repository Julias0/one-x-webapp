export interface MeetingItemDto {
  content: string;
  notes: string;
  nextSteps: string[]
};

export interface MeetingDto {
  _id?: string;
  name: string;
  owner?: string;
  withWhom: string;
  meetingItems: MeetingItemDto[];
  notes?: string;
};