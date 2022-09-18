export enum QuestStatus {
  CREATED,
  PENDING,
  READYTOPICKUP,
  PICKEDUP,
  COMPLETED,
  DISMISSED,
  PAIDOUT,
}

export interface QuestDetails {
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  additionalInfo: string;
  communicationChannelLink: string;
}
