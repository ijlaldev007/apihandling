import express from "express";
const router = express.Router();

// Generate sample time series data
const generateTimeSeriesData = (days = 30, metric = "temperature") => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  // Set base value and variation based on metric
  let baseValue, variation, unit;
  
  switch (metric) {
    case "temperature":
      baseValue = 22; // 22°C
      variation = 5;  // ±5°C
      unit = "celsius";
      break;
    case "stock":
      baseValue = 100; // $100
      variation = 10;  // ±$10
      unit = "usd";
      break;
    case "users":
      baseValue = 1000; // 1000 users
      variation = 200;  // ±200 users
      unit = "count";
      break;
    case "traffic":
      baseValue = 5000; // 5000 visits
      variation = 1000; // ±1000 visits
      unit = "visits";
      break;
    default:
      baseValue = 50;
      variation = 10;
      unit = "units";
  }
  
  // Generate data points
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Create some realistic patterns
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Weekend adjustment
    let adjustment = 0;
    if (metric === "users" || metric === "traffic") {
      adjustment = isWeekend ? variation * 0.5 : 0; // Less traffic on weekends
    } else if (metric === "stock") {
      adjustment = isWeekend ? 0 : (Math.random() - 0.5) * variation * 2; // Stock market closed on weekends
    }
    
    // Add some randomness and trend
    const trend = i / days * variation; // Slight upward trend
    const random = (Math.random() - 0.5) * variation;
    const value = baseValue + trend + random + adjustment;
    
    // Add hourly data for the last 3 days
    let hourlyData = null;
    if (i >= days - 3) {
      hourlyData = [];
      for (let hour = 0; hour < 24; hour++) {
        const hourDate = new Date(date);
        hourDate.setHours(hour);
        
        // More variation during business hours
        const isBusinessHour = hour >= 9 && hour <= 17;
        const hourAdjustment = isBusinessHour ? variation * 0.2 : -variation * 0.1;
        const hourValue = value + hourAdjustment + (Math.random() - 0.5) * variation * 0.5;
        
        hourlyData.push({
          timestamp: hourDate.toISOString(),
          value: parseFloat(hourValue.toFixed(2))
        });
      }
    }
    
    data.push({
      timestamp: date.toISOString(),
      value: parseFloat(value.toFixed(2)),
      hourly: hourlyData
    });
  }
  
  return {
    data,
    meta: {
      metric,
      unit,
      start_date: data[0].timestamp,
      end_date: data[data.length - 1].timestamp,
      points: data.length
    }
  };
};

// Available metrics
const availableMetrics = ["temperature", "stock", "users", "traffic"];

// GET time series data
router.get("/", (req, res) => {
  const metric = req.query.metric || "temperature";
  const days = parseInt(req.query.days || "30");
  const resolution = req.query.resolution || "daily";
  
  // Validate metric
  if (!availableMetrics.includes(metric)) {
    return res.status(400).json({ 
      error: "Invalid metric", 
      available_metrics: availableMetrics 
    });
  }
  
  // Validate days
  if (isNaN(days) || days < 1 || days > 365) {
    return res.status(400).json({ 
      error: "Invalid days parameter. Must be between 1 and 365." 
    });
  }
  
  // Generate data
  const timeSeriesData = generateTimeSeriesData(days, metric);
  
  // Filter based on resolution
  if (resolution === "hourly" && days > 7) {
    return res.status(400).json({ 
      error: "Hourly resolution is only available for 7 days or less" 
    });
  }
  
  setTimeout(() => {
    res.json(timeSeriesData);
  }, 1000);
});

// GET available metrics
router.get("/metrics", (_req, res) => {
  setTimeout(() => {
    res.json({
      metrics: availableMetrics,
      default: "temperature"
    });
  }, 300);
});

// GET comparison of multiple metrics
router.get("/compare", (req, res) => {
  const metrics = req.query.metrics ? req.query.metrics.split(",") : ["temperature", "users"];
  const days = parseInt(req.query.days || "30");
  
  // Validate days
  if (isNaN(days) || days < 1 || days > 365) {
    return res.status(400).json({ 
      error: "Invalid days parameter. Must be between 1 and 365." 
    });
  }
  
  // Validate metrics
  const invalidMetrics = metrics.filter(m => !availableMetrics.includes(m));
  if (invalidMetrics.length > 0) {
    return res.status(400).json({ 
      error: "Invalid metrics", 
      invalid_metrics: invalidMetrics,
      available_metrics: availableMetrics 
    });
  }
  
  // Generate data for each metric
  const result = metrics.map(metric => {
    const data = generateTimeSeriesData(days, metric);
    return {
      metric,
      data: data.data,
      meta: data.meta
    };
  });
  
  setTimeout(() => {
    res.json({
      comparison: result,
      meta: {
        days,
        metrics
      }
    });
  }, 1500);
});

export default router;
