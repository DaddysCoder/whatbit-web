export type TimelineEventType = "contact" | "response" | "note" | "system";

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  type?: TimelineEventType;
}
