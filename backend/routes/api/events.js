import express from "express";
const router = express.Router();

// Sample events data
const events = [
  {
    id: "evt1",
    title: "Quarterly Team Meeting",
    start: "2023-07-15T10:00:00Z",
    end: "2023-07-15T11:30:00Z",
    location: "Conference Room A",
    description: "Review Q2 performance and discuss Q3 goals.",
    organizer: "John Smith",
    attendees: [
      { id: "user1", name: "Alice Johnson", status: "confirmed" },
      { id: "user2", name: "Bob Williams", status: "confirmed" },
      { id: "user3", name: "Charlie Davis", status: "tentative" },
      { id: "user4", name: "Diana Miller", status: "confirmed" },
      { id: "user5", name: "Edward Wilson", status: "declined" }
    ],
    category: "meeting",
    isAllDay: false,
    recurrence: null,
    attachments: [
      { name: "Q2 Report.pdf", url: "https://example.com/q2-report.pdf" }
    ],
    reminders: [
      { time: "2023-07-15T09:45:00Z", type: "notification" },
      { time: "2023-07-14T10:00:00Z", type: "email" }
    ]
  },
  {
    id: "evt2",
    title: "Product Launch",
    start: "2023-08-20T09:00:00Z",
    end: "2023-08-20T17:00:00Z",
    location: "Main Hall",
    description: "Launch of our new product line with press and customer presentations.",
    organizer: "Marketing Team",
    attendees: [
      { id: "user1", name: "Alice Johnson", status: "confirmed" },
      { id: "user2", name: "Bob Williams", status: "confirmed" },
      { id: "user6", name: "Frank Thomas", status: "confirmed" },
      { id: "user7", name: "Grace Lee", status: "confirmed" },
      { id: "user8", name: "Henry Clark", status: "confirmed" }
    ],
    category: "event",
    isAllDay: true,
    recurrence: null,
    attachments: [
      { name: "Launch Schedule.pdf", url: "https://example.com/launch-schedule.pdf" },
      { name: "Press Release.docx", url: "https://example.com/press-release.docx" }
    ],
    reminders: [
      { time: "2023-08-20T08:00:00Z", type: "notification" },
      { time: "2023-08-19T09:00:00Z", type: "email" },
      { time: "2023-08-13T09:00:00Z", type: "email" }
    ]
  },
  {
    id: "evt3",
    title: "Weekly Status Update",
    start: "2023-07-10T14:00:00Z",
    end: "2023-07-10T14:30:00Z",
    location: "Conference Room B",
    description: "Regular team status update meeting.",
    organizer: "Team Lead",
    attendees: [
      { id: "user1", name: "Alice Johnson", status: "confirmed" },
      { id: "user2", name: "Bob Williams", status: "confirmed" },
      { id: "user3", name: "Charlie Davis", status: "confirmed" }
    ],
    category: "meeting",
    isAllDay: false,
    recurrence: {
      frequency: "weekly",
      interval: 1,
      dayOfWeek: "monday",
      endDate: "2023-12-31T23:59:59Z"
    },
    attachments: [],
    reminders: [
      { time: "2023-07-10T13:45:00Z", type: "notification" }
    ]
  },
  {
    id: "evt4",
    title: "Client Presentation",
    start: "2023-07-18T11:00:00Z",
    end: "2023-07-18T12:30:00Z",
    location: "Client Office",
    description: "Presentation of project progress to the client.",
    organizer: "Project Manager",
    attendees: [
      { id: "user1", name: "Alice Johnson", status: "confirmed" },
      { id: "user4", name: "Diana Miller", status: "confirmed" },
      { id: "user9", name: "Ivan Rodriguez", status: "confirmed" }
    ],
    category: "meeting",
    isAllDay: false,
    recurrence: null,
    attachments: [
      { name: "Presentation Slides.pptx", url: "https://example.com/presentation.pptx" }
    ],
    reminders: [
      { time: "2023-07-18T10:00:00Z", type: "notification" },
      { time: "2023-07-17T11:00:00Z", type: "email" }
    ]
  },
  {
    id: "evt5",
    title: "Company Holiday",
    start: "2023-09-04T00:00:00Z",
    end: "2023-09-04T23:59:59Z",
    location: null,
    description: "Labor Day - Company Holiday",
    organizer: "HR Department",
    attendees: [],
    category: "holiday",
    isAllDay: true,
    recurrence: null,
    attachments: [],
    reminders: []
  },
  {
    id: "evt6",
    title: "Training Workshop",
    start: "2023-08-10T13:00:00Z",
    end: "2023-08-10T17:00:00Z",
    location: "Training Room",
    description: "Workshop on new technologies and methodologies.",
    organizer: "Training Department",
    attendees: [
      { id: "user2", name: "Bob Williams", status: "confirmed" },
      { id: "user3", name: "Charlie Davis", status: "confirmed" },
      { id: "user5", name: "Edward Wilson", status: "confirmed" },
      { id: "user7", name: "Grace Lee", status: "tentative" }
    ],
    category: "training",
    isAllDay: false,
    recurrence: null,
    attachments: [
      { name: "Workshop Materials.pdf", url: "https://example.com/workshop-materials.pdf" }
    ],
    reminders: [
      { time: "2023-08-10T12:30:00Z", type: "notification" },
      { time: "2023-08-09T13:00:00Z", type: "email" }
    ]
  },
  {
    id: "evt7",
    title: "Project Deadline",
    start: "2023-08-31T17:00:00Z",
    end: "2023-08-31T17:00:00Z",
    location: null,
    description: "Deadline for Phase 1 of the project.",
    organizer: "Project Manager",
    attendees: [
      { id: "user1", name: "Alice Johnson", status: "confirmed" },
      { id: "user2", name: "Bob Williams", status: "confirmed" },
      { id: "user3", name: "Charlie Davis", status: "confirmed" },
      { id: "user4", name: "Diana Miller", status: "confirmed" }
    ],
    category: "deadline",
    isAllDay: false,
    recurrence: null,
    attachments: [],
    reminders: [
      { time: "2023-08-31T09:00:00Z", type: "notification" },
      { time: "2023-08-24T09:00:00Z", type: "email" },
      { time: "2023-08-30T09:00:00Z", type: "email" }
    ]
  },
  {
    id: "evt8",
    title: "Team Building Event",
    start: "2023-09-15T13:00:00Z",
    end: "2023-09-15T18:00:00Z",
    location: "City Park",
    description: "Outdoor team building activities and barbecue.",
    organizer: "HR Department",
    attendees: [
      { id: "user1", name: "Alice Johnson", status: "confirmed" },
      { id: "user2", name: "Bob Williams", status: "tentative" },
      { id: "user3", name: "Charlie Davis", status: "confirmed" },
      { id: "user4", name: "Diana Miller", status: "confirmed" },
      { id: "user5", name: "Edward Wilson", status: "confirmed" },
      { id: "user6", name: "Frank Thomas", status: "declined" },
      { id: "user7", name: "Grace Lee", status: "confirmed" },
      { id: "user8", name: "Henry Clark", status: "tentative" }
    ],
    category: "social",
    isAllDay: false,
    recurrence: null,
    attachments: [
      { name: "Event Details.pdf", url: "https://example.com/team-building-details.pdf" }
    ],
    reminders: [
      { time: "2023-09-15T12:00:00Z", type: "notification" },
      { time: "2023-09-14T13:00:00Z", type: "email" }
    ]
  },
  {
    id: "evt9",
    title: "Monthly Department Meeting",
    start: "2023-07-28T15:00:00Z",
    end: "2023-07-28T16:00:00Z",
    location: "Conference Room A",
    description: "Monthly department status and planning meeting.",
    organizer: "Department Head",
    attendees: [
      { id: "user1", name: "Alice Johnson", status: "confirmed" },
      { id: "user2", name: "Bob Williams", status: "confirmed" },
      { id: "user3", name: "Charlie Davis", status: "confirmed" },
      { id: "user4", name: "Diana Miller", status: "confirmed" },
      { id: "user5", name: "Edward Wilson", status: "confirmed" }
    ],
    category: "meeting",
    isAllDay: false,
    recurrence: {
      frequency: "monthly",
      interval: 1,
      dayOfMonth: 28,
      endDate: "2023-12-31T23:59:59Z"
    },
    attachments: [],
    reminders: [
      { time: "2023-07-28T14:45:00Z", type: "notification" },
      { time: "2023-07-27T15:00:00Z", type: "email" }
    ]
  },
  {
    id: "evt10",
    title: "Annual Performance Review",
    start: "2023-10-10T10:00:00Z",
    end: "2023-10-10T11:00:00Z",
    location: "Manager's Office",
    description: "Annual performance review meeting.",
    organizer: "HR Department",
    attendees: [
      { id: "user1", name: "Alice Johnson", status: "confirmed" },
      { id: "user10", name: "Jane Smith", status: "confirmed" }
    ],
    category: "meeting",
    isAllDay: false,
    recurrence: null,
    attachments: [
      { name: "Performance Review Form.pdf", url: "https://example.com/performance-review-form.pdf" }
    ],
    reminders: [
      { time: "2023-10-10T09:30:00Z", type: "notification" },
      { time: "2023-10-09T10:00:00Z", type: "email" },
      { time: "2023-10-03T10:00:00Z", type: "email" }
    ]
  }
];

// Helper function to check if a date is within a range
const isDateInRange = (date, startDate, endDate) => {
  const eventDate = new Date(date);
  const start = startDate ? new Date(startDate) : new Date(0); // Beginning of time if not specified
  const end = endDate ? new Date(endDate) : new Date(8640000000000000); // End of time if not specified
  
  return eventDate >= start && eventDate <= end;
};

// GET all events
router.get("/", (req, res) => {
  let result = [...events];
  
  // Filter by date range if provided
  if (req.query.start || req.query.end) {
    result = result.filter(event => 
      isDateInRange(event.start, req.query.start, req.query.end)
    );
  }
  
  // Filter by category if provided
  if (req.query.category) {
    result = result.filter(event => 
      event.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }
  
  // Filter by attendee if provided
  if (req.query.attendee) {
    result = result.filter(event => 
      event.attendees.some(attendee => 
        attendee.id === req.query.attendee || 
        attendee.name.toLowerCase().includes(req.query.attendee.toLowerCase())
      )
    );
  }
  
  // Search in title and description if provided
  if (req.query.search) {
    const searchTerm = req.query.search.toLowerCase();
    result = result.filter(event => 
      event.title.toLowerCase().includes(searchTerm) || 
      (event.description && event.description.toLowerCase().includes(searchTerm))
    );
  }
  
  setTimeout(() => {
    res.json({
      events: result,
      count: result.length,
      total: events.length
    });
  }, 800);
});

// GET a specific event
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const event = events.find(evt => evt.id === id);
  
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  
  setTimeout(() => {
    res.json(event);
  }, 500);
});

// GET events for a specific day
router.get("/day/:date", (req, res) => {
  const date = req.params.date; // Format: YYYY-MM-DD
  
  if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
  }
  
  // Create start and end of the day
  const startOfDay = `${date}T00:00:00Z`;
  const endOfDay = `${date}T23:59:59Z`;
  
  // Filter events for the day
  const dayEvents = events.filter(event => 
    isDateInRange(event.start, startOfDay, endOfDay)
  );
  
  setTimeout(() => {
    res.json({
      date,
      events: dayEvents,
      count: dayEvents.length
    });
  }, 600);
});

// GET events for a specific week
router.get("/week/:startDate", (req, res) => {
  const startDate = req.params.startDate; // Format: YYYY-MM-DD (Monday)
  
  if (!startDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
  }
  
  // Create start and end of the week
  const startOfWeek = `${startDate}T00:00:00Z`;
  
  // Calculate end of week (Sunday)
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);
  const endOfWeek = `${endDate.toISOString().split('T')[0]}T23:59:59Z`;
  
  // Filter events for the week
  const weekEvents = events.filter(event => 
    isDateInRange(event.start, startOfWeek, endOfWeek)
  );
  
  setTimeout(() => {
    res.json({
      startDate,
      endDate: endDate.toISOString().split('T')[0],
      events: weekEvents,
      count: weekEvents.length
    });
  }, 700);
});

// GET events for a specific month
router.get("/month/:yearMonth", (req, res) => {
  const yearMonth = req.params.yearMonth; // Format: YYYY-MM
  
  if (!yearMonth.match(/^\d{4}-\d{2}$/)) {
    return res.status(400).json({ error: "Invalid date format. Use YYYY-MM." });
  }
  
  // Create start and end of the month
  const startOfMonth = `${yearMonth}-01T00:00:00Z`;
  
  // Calculate end of month
  const [year, month] = yearMonth.split('-').map(Number);
  const endDate = new Date(year, month, 0); // Last day of month
  const endOfMonth = `${year}-${month.toString().padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}T23:59:59Z`;
  
  // Filter events for the month
  const monthEvents = events.filter(event => 
    isDateInRange(event.start, startOfMonth, endOfMonth)
  );
  
  setTimeout(() => {
    res.json({
      yearMonth,
      startDate: `${yearMonth}-01`,
      endDate: `${year}-${month.toString().padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}`,
      events: monthEvents,
      count: monthEvents.length
    });
  }, 800);
});

// GET event categories
router.get("/categories/all", (_req, res) => {
  const categories = [...new Set(events.map(event => event.category))];
  
  setTimeout(() => {
    res.json({ categories });
  }, 300);
});

export default router;
