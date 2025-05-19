import { useQuery } from "@tanstack/react-query";
import axios from "axios"; // Keep for axios.isCancel
import { get } from "@/api/client";

//import types
import type {
  Event,
  EventsResponse,
  DayEventsResponse,
  WeekEventsResponse,
  MonthEventsResponse,
  CategoriesResponse,
  EventsQueryParams,
} from "@/types/events";

/**
 * Hook to fetch all events with optional filters
 *
 * @param params - Optional query parameters for filtering events
 * @returns {Object} React Query result object containing:
 *   - data: EventsResponse object with structure:
 *     {
 *       events: Event[] - Array of event objects
 *       count: number - Number of events returned
 *       total: number - Total number of events in the database
 *     }
 *   - isLoading: boolean - True while the request is in progress
 *   - isError: boolean - True if the request failed
 *   - error: Error object if the request failed
 *   - refetch: Function to manually refetch the data
 */
export function useEvents(params: EventsQueryParams = {}) {
  return useQuery({
    queryKey: ["events", params],
    queryFn: async ({ signal }): Promise<EventsResponse> => {
      const queryParams = new URLSearchParams();
      if (params.start) queryParams.append("start", params.start);
      if (params.end) queryParams.append("end", params.end);
      if (params.category) queryParams.append("category", params.category);
      if (params.attendee) queryParams.append("attendee", params.attendee);
      if (params.search) queryParams.append("search", params.search);
      const url = `/events?${queryParams.toString()}`;
      try {
        const response = await get<EventsResponse>(url, { signal });
        return response.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled:', error.message);
          throw new Error('Request cancelled');
        }
        throw error;
      }
    },
  });
}

/**
 * Hook to fetch a single event by its ID
 *
 * @param id - The ID of the event to fetch
 * @returns {Object} React Query result object containing:
 *   - data: Event object with complete event details
 *   - isLoading: boolean - True while the request is in progress
 *   - isError: boolean - True if the request failed
 *   - error: Error object if the request failed
 *   - refetch: Function to manually refetch the data
 *
 * Note: This hook will not fetch data if id is null
 */
export function useEvent(id: string | null) {
  return useQuery({
    queryKey: ["event", id],
    queryFn: async ({ signal }): Promise<Event> => {
      if (id === null) throw new Error("Event ID is required");
      try {
        const response = await get<Event>(`/events/${id}`, { signal });
        return response.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled:', error.message);
          throw new Error('Request cancelled');
        }
        throw error;
      }
    },
    enabled: !!id, // Only fetch if id is provided
  });
}

/**
 * Hook to fetch events for a specific day
 *
 * @param date - The date to fetch events for (format: YYYY-MM-DD)
 * @returns {Object} React Query result object containing:
 *   - data: DayEventsResponse object with structure:
 *     {
 *       date: string - The date requested (YYYY-MM-DD)
 *       events: Event[] - Array of events on that day
 *       count: number - Number of events returned
 *     }
 *   - isLoading: boolean - True while the request is in progress
 *   - isError: boolean - True if the request failed
 *   - error: Error object if the request failed
 *   - refetch: Function to manually refetch the data
 *
 * Note: This hook will not fetch data if date is null
 */
export function useDayEvents(date: string | null) {
  return useQuery({
    queryKey: ["dayEvents", date],
    queryFn: async ({ signal }): Promise<DayEventsResponse> => {
      if (!date) throw new Error("Date is required");
      try {
        const response = await get<DayEventsResponse>(
          `/events/day/${date}`,
          { signal }
        );
        return response.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled:', error.message);
          throw new Error('Request cancelled');
        }
        throw error;
      }
    },
    enabled: !!date,
  });
}

/**
 * Hook to fetch events for a specific week
 *
 * @param startDate - The start date of the week (format: YYYY-MM-DD)
 * @returns {Object} React Query result object containing:
 *   - data: WeekEventsResponse object with structure:
 *     {
 *       startDate: string - The start date of the week (YYYY-MM-DD)
 *       endDate: string - The end date of the week (YYYY-MM-DD)
 *       events: Event[] - Array of events during that week
 *       count: number - Number of events returned
 *     }
 *   - isLoading: boolean - True while the request is in progress
 *   - isError: boolean - True if the request failed
 *   - error: Error object if the request failed
 *   - refetch: Function to manually refetch the data
 *
 * Note: This hook will not fetch data if startDate is null
 */
export function useWeekEvents(startDate: string | null) {
  return useQuery({
    queryKey: ["weekEvents", startDate],
    queryFn: async ({ signal }): Promise<WeekEventsResponse> => {
      if (!startDate) throw new Error("Start date is required");
      try {
        const response = await get<WeekEventsResponse>(
          `/events/week/${startDate}`,
          { signal }
        );
        return response.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled:', error.message);
          throw new Error('Request cancelled');
        }
        throw error;
      }
    },
    enabled: !!startDate,
  });
}

/**
 * Hook to fetch events for a specific month
 *
 * @param yearMonth - The year and month to fetch events for (format: YYYY-MM)
 * @returns {Object} React Query result object containing:
 *   - data: MonthEventsResponse object with structure:
 *     {
 *       yearMonth: string - The year and month requested (YYYY-MM)
 *       startDate: string - The first day of the month (YYYY-MM-DD)
 *       endDate: string - The last day of the month (YYYY-MM-DD)
 *       events: Event[] - Array of events during that month
 *       count: number - Number of events returned
 *     }
 *   - isLoading: boolean - True while the request is in progress
 *   - isError: boolean - True if the request failed
 *   - error: Error object if the request failed
 *   - refetch: Function to manually refetch the data
 *
 * Note: This hook will not fetch data if yearMonth is null
 */
export function useMonthEvents(yearMonth: string | null) {
  return useQuery({
    queryKey: ["monthEvents", yearMonth],
    queryFn: async ({ signal }): Promise<MonthEventsResponse> => {
      if (!yearMonth) throw new Error("Year and month are required");
      try {
        const response = await get<MonthEventsResponse>(
          `/events/month/${yearMonth}`,
          { signal }
        );
        return response.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled:', error.message);
          throw new Error('Request cancelled');
        }
        throw error;
      }
    },
    enabled: !!yearMonth,
  });
}

/**
 * Hook to fetch all event categories
 *
 * @returns {Object} React Query result object containing:
 *   - data: CategoriesResponse object with structure:
 *     {
 *       categories: string[] - Array of category names
 *     }
 *   - isLoading: boolean - True while the request is in progress
 *   - isError: boolean - True if the request failed
 *   - error: Error object if the request failed
 *   - refetch: Function to manually refetch the data
 */
export function useEventCategories() {
  return useQuery({
    queryKey: ["eventCategories"],
    queryFn: async ({ signal }): Promise<CategoriesResponse> => {
      try {
        const response = await get<CategoriesResponse>(
          "/events/categories/all",
          { signal }
        );
        return response.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled:', error.message);
          throw new Error('Request cancelled');
        }
        throw error;
      }
    },
  });
}
