import express from "express";
const router = express.Router();

// Generate sample statistical data
const generateAgeDistribution = () => {
  const buckets = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"];
  const distribution = buckets.map(bucket => {
    // Generate realistic distribution with more people in middle age groups
    let count;
    switch (bucket) {
      case "18-24": count = 120 + Math.floor(Math.random() * 30); break;
      case "25-34": count = 350 + Math.floor(Math.random() * 50); break;
      case "35-44": count = 270 + Math.floor(Math.random() * 40); break;
      case "45-54": count = 180 + Math.floor(Math.random() * 30); break;
      case "55-64": count = 150 + Math.floor(Math.random() * 20); break;
      case "65+": count = 90 + Math.floor(Math.random() * 15); break;
      default: count = 100;
    }
    
    return { bucket, count };
  });
  
  // Calculate summary statistics
  const total = distribution.reduce((sum, item) => sum + item.count, 0);
  const weightedSum = distribution.reduce((sum, item) => {
    // Use the middle of each age range for calculation
    const midpoint = bucket => {
      switch (bucket) {
        case "18-24": return 21;
        case "25-34": return 29.5;
        case "35-44": return 39.5;
        case "45-54": return 49.5;
        case "55-64": return 59.5;
        case "65+": return 72; // Estimate
        default: return 35;
      }
    };
    
    return sum + (midpoint(item.bucket) * item.count);
  }, 0);
  
  const mean = parseFloat((weightedSum / total).toFixed(1));
  
  // Simplified median calculation (not exact)
  const sortedBuckets = [...distribution].sort((a, b) => a.count - b.count);
  const median = parseFloat(sortedBuckets[Math.floor(sortedBuckets.length / 2)].bucket.split("-")[0]) + 2;
  
  // Mode is the bucket with the highest count
  const mode = distribution.reduce((max, item) => 
    item.count > max.count ? item : max, { count: 0 }
  ).bucket;
  
  return {
    distribution,
    summary: {
      total,
      mean,
      median,
      mode
    }
  };
};

// Generate sample income distribution
const generateIncomeDistribution = () => {
  const buckets = [
    "Under $25K", 
    "$25K-$50K", 
    "$50K-$75K", 
    "$75K-$100K", 
    "$100K-$150K", 
    "Over $150K"
  ];
  
  const distribution = buckets.map(bucket => {
    // Generate realistic income distribution
    let count;
    switch (bucket) {
      case "Under $25K": count = 150 + Math.floor(Math.random() * 30); break;
      case "$25K-$50K": count = 280 + Math.floor(Math.random() * 40); break;
      case "$50K-$75K": count = 320 + Math.floor(Math.random() * 50); break;
      case "$75K-$100K": count = 210 + Math.floor(Math.random() * 40); break;
      case "$100K-$150K": count = 120 + Math.floor(Math.random() * 30); break;
      case "Over $150K": count = 80 + Math.floor(Math.random() * 20); break;
      default: count = 100;
    }
    
    return { bucket, count };
  });
  
  // Calculate summary statistics
  const total = distribution.reduce((sum, item) => sum + item.count, 0);
  const weightedSum = distribution.reduce((sum, item) => {
    // Use the middle of each income range for calculation
    const midpoint = bucket => {
      switch (bucket) {
        case "Under $25K": return 12500;
        case "$25K-$50K": return 37500;
        case "$50K-$75K": return 62500;
        case "$75K-$100K": return 87500;
        case "$100K-$150K": return 125000;
        case "Over $150K": return 200000; // Estimate
        default: return 50000;
      }
    };
    
    return sum + (midpoint(item.bucket) * item.count);
  }, 0);
  
  const mean = Math.round(weightedSum / total);
  
  // Simplified median calculation (not exact)
  let cumulativeCount = 0;
  let medianBucket = "";
  for (const item of distribution) {
    cumulativeCount += item.count;
    if (cumulativeCount >= total / 2 && !medianBucket) {
      medianBucket = item.bucket;
    }
  }
  
  // Mode is the bucket with the highest count
  const mode = distribution.reduce((max, item) => 
    item.count > max.count ? item : max, { count: 0 }
  ).bucket;
  
  return {
    distribution,
    summary: {
      total,
      mean,
      median: medianBucket,
      mode
    }
  };
};

// Generate sample geographic distribution
const generateGeographicDistribution = () => {
  const regions = [
    "Northeast", 
    "Southeast", 
    "Midwest", 
    "Southwest", 
    "West"
  ];
  
  const distribution = regions.map(region => {
    // Generate realistic geographic distribution
    let count;
    switch (region) {
      case "Northeast": count = 180 + Math.floor(Math.random() * 30); break;
      case "Southeast": count = 250 + Math.floor(Math.random() * 40); break;
      case "Midwest": count = 220 + Math.floor(Math.random() * 35); break;
      case "Southwest": count = 190 + Math.floor(Math.random() * 30); break;
      case "West": count = 320 + Math.floor(Math.random() * 50); break;
      default: count = 200;
    }
    
    return { region, count };
  });
  
  // Calculate total
  const total = distribution.reduce((sum, item) => sum + item.count, 0);
  
  // Calculate percentages
  const distributionWithPercentages = distribution.map(item => ({
    ...item,
    percentage: parseFloat(((item.count / total) * 100).toFixed(1))
  }));
  
  return {
    distribution: distributionWithPercentages,
    total
  };
};

// Generate sample device usage statistics
const generateDeviceUsage = () => {
  const devices = ["Desktop", "Mobile", "Tablet"];
  
  const distribution = devices.map(device => {
    // Generate realistic device usage
    let percentage;
    switch (device) {
      case "Desktop": percentage = 35 + Math.floor(Math.random() * 10); break;
      case "Mobile": percentage = 55 + Math.floor(Math.random() * 10); break;
      case "Tablet": percentage = 10 + Math.floor(Math.random() * 5); break;
      default: percentage = 33;
    }
    
    return { device, percentage };
  });
  
  // Normalize percentages to ensure they sum to 100
  const total = distribution.reduce((sum, item) => sum + item.percentage, 0);
  const normalizedDistribution = distribution.map(item => ({
    ...item,
    percentage: parseFloat(((item.percentage / total) * 100).toFixed(1))
  }));
  
  return normalizedDistribution;
};

// Generate sample satisfaction survey results
const generateSatisfactionResults = () => {
  const ratings = [1, 2, 3, 4, 5]; // 1-5 scale
  
  const distribution = ratings.map(rating => {
    // Generate realistic satisfaction distribution (skewed positive)
    let count;
    switch (rating) {
      case 1: count = 15 + Math.floor(Math.random() * 10); break;
      case 2: count = 40 + Math.floor(Math.random() * 15); break;
      case 3: count = 120 + Math.floor(Math.random() * 30); break;
      case 4: count = 280 + Math.floor(Math.random() * 50); break;
      case 5: count = 350 + Math.floor(Math.random() * 60); break;
      default: count = 100;
    }
    
    return { rating, count };
  });
  
  // Calculate summary statistics
  const total = distribution.reduce((sum, item) => sum + item.count, 0);
  const weightedSum = distribution.reduce((sum, item) => 
    sum + (item.rating * item.count), 0
  );
  
  const mean = parseFloat((weightedSum / total).toFixed(2));
  
  // Calculate percentages
  const distributionWithPercentages = distribution.map(item => ({
    ...item,
    percentage: parseFloat(((item.count / total) * 100).toFixed(1))
  }));
  
  return {
    distribution: distributionWithPercentages,
    summary: {
      total,
      mean,
      respondents: total
    }
  };
};

// GET age distribution
router.get("/age", (_req, res) => {
  const data = generateAgeDistribution();
  
  setTimeout(() => {
    res.json(data);
  }, 800);
});

// GET income distribution
router.get("/income", (_req, res) => {
  const data = generateIncomeDistribution();
  
  setTimeout(() => {
    res.json(data);
  }, 800);
});

// GET geographic distribution
router.get("/geographic", (_req, res) => {
  const data = generateGeographicDistribution();
  
  setTimeout(() => {
    res.json(data);
  }, 800);
});

// GET device usage
router.get("/devices", (_req, res) => {
  const data = generateDeviceUsage();
  
  setTimeout(() => {
    res.json({ devices: data });
  }, 500);
});

// GET satisfaction survey results
router.get("/satisfaction", (_req, res) => {
  const data = generateSatisfactionResults();
  
  setTimeout(() => {
    res.json(data);
  }, 800);
});

// GET all statistics
router.get("/dashboard", (_req, res) => {
  const age = generateAgeDistribution();
  const income = generateIncomeDistribution();
  const geographic = generateGeographicDistribution();
  const devices = generateDeviceUsage();
  const satisfaction = generateSatisfactionResults();
  
  setTimeout(() => {
    res.json({
      age,
      income,
      geographic,
      devices,
      satisfaction,
      timestamp: new Date().toISOString()
    });
  }, 1500);
});

export default router;
