// Define TypeScript interfaces based on API response structures
export interface Event {
    id: string;
    title: string;
    start: string;
    end: string;
    location: string | null;
    description: string;
    organizer: string;
    attendees: Array<{
      id: string;
      name: string;
      status: string;
    }>;
    category: string;
    isAllDay: boolean;
    recurrence: {
      frequency: string;
      interval: number;
      dayOfWeek?: string;
      dayOfMonth?: number;
      endDate: string;
    } | null;
    attachments: Array<{
      name: string;
      url: string;
    }>;
    reminders: Array<{
      time: string;
      type: string;
    }>;
  }
  
  export interface EventsResponse {
    events: Event[];
    count: number;
    total: number;
  }
  
  export interface DayEventsResponse {
    date: string;
    events: Event[];
    count: number;
  }
  
  export interface WeekEventsResponse {
    startDate: string;
    endDate: string;
    events: Event[];
    count: number;
  }
  
  export interface MonthEventsResponse {
    yearMonth: string;
    startDate: string;
    endDate: string;
    events: Event[];
    count: number;
  }
  
  export interface CategoriesResponse {
    categories: string[];
  }
  
  // Query parameters for the all events endpoint
  export interface EventsQueryParams {
    start?: string;
    end?: string;
    category?: string;
    attendee?: string;
    search?: string;
  }