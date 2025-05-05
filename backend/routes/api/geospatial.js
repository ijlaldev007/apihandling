import express from "express";
const router = express.Router();

// Sample geospatial data - store locations
const locations = [
  { 
    id: 1, 
    name: "Downtown Store", 
    lat: 40.7128, 
    lng: -74.0060, 
    type: "retail",
    address: "123 Broadway, New York, NY 10001",
    hours: "9:00 AM - 9:00 PM",
    phone: "212-555-1234",
    sales: 1250000,
    employees: 25,
    openDate: "2018-03-15"
  },
  { 
    id: 2, 
    name: "Midtown Warehouse", 
    lat: 40.7549, 
    lng: -73.9840, 
    type: "warehouse",
    address: "456 5th Avenue, New York, NY 10018",
    hours: "8:00 AM - 8:00 PM",
    phone: "212-555-5678",
    sales: null,
    employees: 40,
    openDate: "2015-07-22"
  },
  { 
    id: 3, 
    name: "Brooklyn Store", 
    lat: 40.6782, 
    lng: -73.9442, 
    type: "retail",
    address: "789 Atlantic Ave, Brooklyn, NY 11217",
    hours: "10:00 AM - 8:00 PM",
    phone: "718-555-9012",
    sales: 980000,
    employees: 18,
    openDate: "2019-11-05"
  },
  { 
    id: 4, 
    name: "Queens Distribution Center", 
    lat: 40.7282, 
    lng: -73.7949, 
    type: "distribution",
    address: "321 Queens Blvd, Queens, NY 11101",
    hours: "24/7",
    phone: "718-555-3456",
    sales: null,
    employees: 65,
    openDate: "2014-02-10"
  },
  { 
    id: 5, 
    name: "Bronx Store", 
    lat: 40.8448, 
    lng: -73.8648, 
    type: "retail",
    address: "555 Grand Concourse, Bronx, NY 10451",
    hours: "9:00 AM - 7:00 PM",
    phone: "718-555-7890",
    sales: 750000,
    employees: 15,
    openDate: "2020-06-18"
  },
  { 
    id: 6, 
    name: "Staten Island Store", 
    lat: 40.5795, 
    lng: -74.1502, 
    type: "retail",
    address: "888 Richmond Ave, Staten Island, NY 10314",
    hours: "10:00 AM - 7:00 PM",
    phone: "718-555-2345",
    sales: 620000,
    employees: 12,
    openDate: "2021-03-30"
  },
  { 
    id: 7, 
    name: "Jersey City Warehouse", 
    lat: 40.7178, 
    lng: -74.0431, 
    type: "warehouse",
    address: "111 Hudson St, Jersey City, NJ 07302",
    hours: "7:00 AM - 7:00 PM",
    phone: "201-555-6789",
    sales: null,
    employees: 30,
    openDate: "2017-09-12"
  },
  { 
    id: 8, 
    name: "Hoboken Store", 
    lat: 40.7439, 
    lng: -74.0323, 
    type: "retail",
    address: "222 Washington St, Hoboken, NJ 07030",
    hours: "9:00 AM - 8:00 PM",
    phone: "201-555-0123",
    sales: 880000,
    employees: 16,
    openDate: "2019-05-25"
  },
  { 
    id: 9, 
    name: "Long Island City Store", 
    lat: 40.7447, 
    lng: -73.9485, 
    type: "retail",
    address: "333 Jackson Ave, Queens, NY 11101",
    hours: "10:00 AM - 9:00 PM",
    phone: "718-555-4567",
    sales: 1100000,
    employees: 22,
    openDate: "2018-11-15"
  },
  { 
    id: 10, 
    name: "Newark Distribution Center", 
    lat: 40.7357, 
    lng: -74.1724, 
    type: "distribution",
    address: "444 Market St, Newark, NJ 07102",
    hours: "24/7",
    phone: "973-555-8901",
    sales: null,
    employees: 55,
    openDate: "2016-04-08"
  }
];

// Sample delivery routes
const routes = [
  {
    id: 1,
    name: "Manhattan Route",
    start: 4, // Queens Distribution Center
    end: 1,   // Downtown Store
    stops: [
      { location_id: 4, sequence: 1, arrival_time: "06:00:00", departure_time: "06:30:00" },
      { location_id: 2, sequence: 2, arrival_time: "07:15:00", departure_time: "08:00:00" },
      { location_id: 1, sequence: 3, arrival_time: "08:30:00", departure_time: "09:00:00" }
    ],
    distance: 15.2, // miles
    duration: 180,  // minutes
    status: "active"
  },
  {
    id: 2,
    name: "Brooklyn Route",
    start: 4, // Queens Distribution Center
    end: 3,   // Brooklyn Store
    stops: [
      { location_id: 4, sequence: 1, arrival_time: "07:00:00", departure_time: "07:30:00" },
      { location_id: 9, sequence: 2, arrival_time: "07:45:00", departure_time: "08:15:00" },
      { location_id: 3, sequence: 3, arrival_time: "09:00:00", departure_time: "09:30:00" }
    ],
    distance: 12.8, // miles
    duration: 150,  // minutes
    status: "active"
  },
  {
    id: 3,
    name: "Bronx Route",
    start: 4, // Queens Distribution Center
    end: 5,   // Bronx Store
    stops: [
      { location_id: 4, sequence: 1, arrival_time: "08:00:00", departure_time: "08:30:00" },
      { location_id: 5, sequence: 2, arrival_time: "09:15:00", departure_time: "09:45:00" }
    ],
    distance: 10.5, // miles
    duration: 105,  // minutes
    status: "active"
  },
  {
    id: 4,
    name: "Staten Island Route",
    start: 10, // Newark Distribution Center
    end: 6,    // Staten Island Store
    stops: [
      { location_id: 10, sequence: 1, arrival_time: "06:30:00", departure_time: "07:00:00" },
      { location_id: 7, sequence: 2, arrival_time: "07:30:00", departure_time: "08:00:00" },
      { location_id: 6, sequence: 3, arrival_time: "08:45:00", departure_time: "09:15:00" }
    ],
    distance: 18.3, // miles
    duration: 165,  // minutes
    status: "active"
  },
  {
    id: 5,
    name: "New Jersey Route",
    start: 10, // Newark Distribution Center
    end: 8,    // Hoboken Store
    stops: [
      { location_id: 10, sequence: 1, arrival_time: "07:30:00", departure_time: "08:00:00" },
      { location_id: 7, sequence: 2, arrival_time: "08:30:00", departure_time: "09:00:00" },
      { location_id: 8, sequence: 3, arrival_time: "09:15:00", departure_time: "09:45:00" }
    ],
    distance: 14.2, // miles
    duration: 135,  // minutes
    status: "active"
  }
];

// GET all locations
router.get("/locations", (req, res) => {
  let result = [...locations];
  
  // Filter by type if provided
  if (req.query.type) {
    result = result.filter(location => 
      location.type.toLowerCase() === req.query.type.toLowerCase()
    );
  }
  
  setTimeout(() => {
    res.json({ locations: result });
  }, 800);
});

// GET a specific location
router.get("/locations/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const location = locations.find(loc => loc.id === id);
  
  if (!location) {
    return res.status(404).json({ error: "Location not found" });
  }
  
  setTimeout(() => {
    res.json(location);
  }, 500);
});

// GET all routes
router.get("/routes", (req, res) => {
  let result = [...routes];
  
  // Filter by start location if provided
  if (req.query.start) {
    const startId = parseInt(req.query.start);
    result = result.filter(route => route.start === startId);
  }
  
  // Filter by end location if provided
  if (req.query.end) {
    const endId = parseInt(req.query.end);
    result = result.filter(route => route.end === endId);
  }
  
  setTimeout(() => {
    res.json({ routes: result });
  }, 800);
});

// GET a specific route
router.get("/routes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const route = routes.find(r => r.id === id);
  
  if (!route) {
    return res.status(404).json({ error: "Route not found" });
  }
  
  // Enhance route with location details
  const enhancedRoute = {
    ...route,
    stops: route.stops.map(stop => {
      const location = locations.find(loc => loc.id === stop.location_id);
      return {
        ...stop,
        location: location ? {
          id: location.id,
          name: location.name,
          lat: location.lat,
          lng: location.lng,
          type: location.type,
          address: location.address
        } : null
      };
    })
  };
  
  setTimeout(() => {
    res.json(enhancedRoute);
  }, 600);
});

// GET locations within a radius
router.get("/nearby", (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const radius = parseFloat(req.query.radius || "10"); // Default 10 miles
  
  // Validate parameters
  if (isNaN(lat) || isNaN(lng)) {
    return res.status(400).json({ 
      error: "Invalid coordinates. Both lat and lng are required and must be numbers." 
    });
  }
  
  if (isNaN(radius) || radius <= 0 || radius > 100) {
    return res.status(400).json({ 
      error: "Invalid radius. Must be a positive number not exceeding 100 miles." 
    });
  }
  
  // Calculate distance using Haversine formula
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 3958.8; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };
  
  // Filter locations within radius
  const nearbyLocations = locations.map(location => {
    const distance = calculateDistance(lat, lng, location.lat, location.lng);
    return { ...location, distance };
  }).filter(location => location.distance <= radius)
    .sort((a, b) => a.distance - b.distance);
  
  setTimeout(() => {
    res.json({
      center: { lat, lng },
      radius,
      count: nearbyLocations.length,
      locations: nearbyLocations
    });
  }, 1000);
});

// GET location types
router.get("/types", (_req, res) => {
  const types = [...new Set(locations.map(location => location.type))];
  
  setTimeout(() => {
    res.json({ types });
  }, 300);
});

export default router;
