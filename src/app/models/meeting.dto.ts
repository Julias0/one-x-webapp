export interface MeetingItemDto {
  content: string;
  notes: string;
  nextSteps: string[]
};

export interface MeetingDto {
  _id?: string;
  name: string;
  owner?: string,
  meetingItems: MeetingItemDto[];
};