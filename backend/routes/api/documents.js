import express from "express";
const router = express.Router();

// Sample documents data
const documents = [
  {
    id: "doc1",
    title: "Getting Started Guide",
    content: `
      <h1>Getting Started with Our Platform</h1>
      <p>Welcome to our platform! This guide will help you get started with the basic features and functionality.</p>
      
      <h2>1. Creating Your Account</h2>
      <p>To get started, you'll need to create an account:</p>
      <ol>
        <li>Click the <strong>Sign Up</strong> button in the top-right corner</li>
        <li>Enter your email address and create a password</li>
        <li>Verify your email address by clicking the link in the verification email</li>
        <li>Complete your profile information</li>
      </ol>
      
      <h2>2. Navigating the Dashboard</h2>
      <p>Once you're logged in, you'll see your dashboard. Here's what each section does:</p>
      <ul>
        <li><strong>Overview:</strong> Shows a summary of your recent activity</li>
        <li><strong>Projects:</strong> Lists all your current projects</li>
        <li><strong>Tasks:</strong> Shows tasks assigned to you</li>
        <li><strong>Messages:</strong> Your communication center</li>
        <li><strong>Settings:</strong> Configure your account preferences</li>
      </ul>
      
      <h2>3. Creating Your First Project</h2>
      <p>To create a new project:</p>
      <ol>
        <li>Click the <strong>New Project</strong> button in the Projects section</li>
        <li>Enter a name and description for your project</li>
        <li>Select a template or start from scratch</li>
        <li>Invite team members if needed</li>
        <li>Click <strong>Create Project</strong></li>
      </ol>
      
      <p>That's it! You're now ready to start using our platform. If you need additional help, check out our <a href="#">detailed documentation</a> or <a href="#">contact support</a>.</p>
    `,
    category: "Documentation",
    author: "Support Team",
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-03-20T14:45:00Z",
    tags: ["getting-started", "guide", "beginners"],
    attachments: [
      { type: "pdf", url: "https://example.com/getting-started.pdf", name: "Getting Started PDF" }
    ]
  },
  {
    id: "doc2",
    title: "API Documentation",
    content: `
      <h1>API Documentation</h1>
      <p>This document provides comprehensive information about our REST API endpoints, authentication, and usage examples.</p>
      
      <h2>Authentication</h2>
      <p>All API requests require authentication using an API key. You can obtain your API key from your account settings.</p>
      
      <pre><code>
      // Example request with API key
      fetch('https://api.example.com/data', {
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY'
        }
      })
      </code></pre>
      
      <h2>Endpoints</h2>
      
      <h3>GET /api/users</h3>
      <p>Returns a list of users.</p>
      <h4>Parameters:</h4>
      <ul>
        <li><code>limit</code> (optional): Number of results to return (default: 20)</li>
        <li><code>offset</code> (optional): Offset for pagination (default: 0)</li>
      </ul>
      
      <h3>GET /api/users/:id</h3>
      <p>Returns details for a specific user.</p>
      
      <h3>POST /api/users</h3>
      <p>Creates a new user.</p>
      <h4>Request Body:</h4>
      <pre><code>
      {
        "name": "John Doe",
        "email": "john@example.com",
        "role": "user"
      }
      </code></pre>
      
      <h2>Rate Limiting</h2>
      <p>API requests are limited to 100 requests per minute per API key. If you exceed this limit, you'll receive a 429 Too Many Requests response.</p>
      
      <h2>Error Handling</h2>
      <p>All errors return a JSON object with an <code>error</code> field containing a description of the error.</p>
      
      <pre><code>
      {
        "error": "Invalid API key"
      }
      </code></pre>
    `,
    category: "Technical",
    author: "Developer Team",
    createdAt: "2023-02-10T09:15:00Z",
    updatedAt: "2023-04-05T11:30:00Z",
    tags: ["api", "documentation", "developers"],
    attachments: [
      { type: "json", url: "https://example.com/api-examples.json", name: "API Examples" },
      { type: "pdf", url: "https://example.com/api-docs.pdf", name: "API Documentation PDF" }
    ]
  },
  {
    id: "doc3",
    title: "Privacy Policy",
    content: `
      <h1>Privacy Policy</h1>
      <p>Last updated: May 15, 2023</p>
      
      <p>This Privacy Policy describes how we collect, use, and disclose your personal information when you use our services.</p>
      
      <h2>Information We Collect</h2>
      <p>We collect several types of information from and about users of our website, including:</p>
      <ul>
        <li>Personal information such as name, email address, and contact details that you provide when registering or using our services.</li>
        <li>Usage data such as IP address, browser type, operating system, and pages visited.</li>
        <li>Cookies and similar tracking technologies to enhance your experience on our website.</li>
      </ul>
      
      <h2>How We Use Your Information</h2>
      <p>We use the information we collect for various purposes, including:</p>
      <ul>
        <li>Providing and maintaining our services</li>
        <li>Notifying you about changes to our services</li>
        <li>Allowing you to participate in interactive features</li>
        <li>Providing customer support</li>
        <li>Gathering analysis to improve our services</li>
        <li>Monitoring the usage of our services</li>
        <li>Detecting, preventing, and addressing technical issues</li>
      </ul>
      
      <h2>Disclosure of Your Information</h2>
      <p>We may disclose your personal information in the following situations:</p>
      <ul>
        <li>To comply with legal obligations</li>
        <li>To protect and defend our rights or property</li>
        <li>To prevent or investigate possible wrongdoing</li>
        <li>To protect the personal safety of users or the public</li>
        <li>To protect against legal liability</li>
      </ul>
      
      <h2>Data Security</h2>
      <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
      
      <h2>Your Rights</h2>
      <p>Depending on your location, you may have certain rights regarding your personal information, such as:</p>
      <ul>
        <li>The right to access your personal information</li>
        <li>The right to rectify inaccurate information</li>
        <li>The right to erase your personal information</li>
        <li>The right to restrict processing</li>
        <li>The right to data portability</li>
        <li>The right to object to processing</li>
      </ul>
      
      <h2>Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at privacy@example.com.</p>
    `,
    category: "Legal",
    author: "Legal Team",
    createdAt: "2023-05-15T15:00:00Z",
    updatedAt: "2023-05-15T15:00:00Z",
    tags: ["privacy", "legal", "policy"],
    attachments: [
      { type: "pdf", url: "https://example.com/privacy-policy.pdf", name: "Privacy Policy PDF" }
    ]
  },
  {
    id: "doc4",
    title: "Product Features Overview",
    content: `
      <h1>Product Features Overview</h1>
      <p>Our product offers a comprehensive set of features designed to enhance your productivity and streamline your workflow.</p>
      
      <h2>Dashboard</h2>
      <p>The dashboard provides a centralized view of all your important information and activities.</p>
      <ul>
        <li>Customizable widgets for quick access to key metrics</li>
        <li>Activity feed showing recent updates</li>
        <li>Quick navigation to frequently used features</li>
        <li>Real-time notifications</li>
      </ul>
      
      <h2>Project Management</h2>
      <p>Our project management tools help you organize and track your projects efficiently.</p>
      <ul>
        <li>Create and manage multiple projects</li>
        <li>Assign tasks to team members</li>
        <li>Set deadlines and priorities</li>
        <li>Track progress with visual charts</li>
        <li>Generate reports on project status</li>
      </ul>
      
      <h2>Collaboration Tools</h2>
      <p>Collaborate seamlessly with your team using our integrated communication tools.</p>
      <ul>
        <li>Real-time messaging</li>
        <li>File sharing and version control</li>
        <li>Comment threads on tasks and documents</li>
        <li>Video conferencing integration</li>
        <li>Shared calendars for scheduling</li>
      </ul>
      
      <h2>Analytics</h2>
      <p>Gain insights into your performance with our powerful analytics features.</p>
      <ul>
        <li>Customizable reports and dashboards</li>
        <li>Data visualization tools</li>
        <li>Export options for further analysis</li>
        <li>Trend identification and forecasting</li>
        <li>Performance benchmarking</li>
      </ul>
      
      <h2>Mobile Access</h2>
      <p>Access your work from anywhere with our mobile applications.</p>
      <ul>
        <li>Available for iOS and Android devices</li>
        <li>Offline mode for working without internet connection</li>
        <li>Push notifications for important updates</li>
        <li>Synchronized data across all devices</li>
      </ul>
    `,
    category: "Product",
    author: "Product Team",
    createdAt: "2023-03-20T13:45:00Z",
    updatedAt: "2023-06-10T09:30:00Z",
    tags: ["features", "product", "overview"],
    attachments: [
      { type: "image", url: "https://example.com/product-screenshot.jpg", name: "Product Screenshot" },
      { type: "pdf", url: "https://example.com/product-brochure.pdf", name: "Product Brochure" }
    ]
  },
  {
    id: "doc5",
    title: "Troubleshooting Guide",
    content: `
      <h1>Troubleshooting Guide</h1>
      <p>This guide provides solutions to common issues you might encounter while using our product.</p>
      
      <h2>Login Issues</h2>
      <h3>Problem: Cannot log in to your account</h3>
      <p>Try these solutions:</p>
      <ol>
        <li>Verify that you're using the correct email address and password</li>
        <li>Check if Caps Lock is turned on</li>
        <li>Clear your browser cache and cookies</li>
        <li>Try using a different browser</li>
        <li>Reset your password using the "Forgot Password" link</li>
      </ol>
      
      <h3>Problem: Two-factor authentication not working</h3>
      <p>Try these solutions:</p>
      <ol>
        <li>Ensure your device's time and date are set correctly</li>
        <li>Try using backup codes if you have them</li>
        <li>Contact support if you've lost access to your authentication device</li>
      </ol>
      
      <h2>Performance Issues</h2>
      <h3>Problem: Application running slowly</h3>
      <p>Try these solutions:</p>
      <ol>
        <li>Close unused tabs and applications</li>
        <li>Clear your browser cache</li>
        <li>Check your internet connection speed</li>
        <li>Disable browser extensions that might interfere</li>
        <li>Try using a different browser</li>
      </ol>
      
      <h3>Problem: Features not loading properly</h3>
      <p>Try these solutions:</p>
      <ol>
        <li>Refresh the page</li>
        <li>Clear your browser cache</li>
        <li>Ensure you're using a supported browser version</li>
        <li>Check if there are any ongoing service disruptions</li>
      </ol>
      
      <h2>Data Issues</h2>
      <h3>Problem: Missing or incorrect data</h3>
      <p>Try these solutions:</p>
      <ol>
        <li>Refresh the page to ensure you're seeing the latest data</li>
        <li>Check if you have the necessary permissions to access the data</li>
        <li>Verify that filters or search criteria aren't limiting your view</li>
        <li>Contact support if you believe there's a data integrity issue</li>
      </ol>
      
      <h2>Still Need Help?</h2>
      <p>If you're still experiencing issues after trying these solutions, please contact our support team:</p>
      <ul>
        <li>Email: support@example.com</li>
        <li>Phone: 1-800-555-1234</li>
        <li>Live Chat: Available on our website during business hours</li>
      </ul>
    `,
    category: "Support",
    author: "Support Team",
    createdAt: "2023-04-12T11:20:00Z",
    updatedAt: "2023-07-05T16:15:00Z",
    tags: ["troubleshooting", "support", "help"],
    attachments: [
      { type: "pdf", url: "https://example.com/troubleshooting-guide.pdf", name: "Printable Troubleshooting Guide" }
    ]
  }
];

// GET all documents
router.get("/", (req, res) => {
  let result = [...documents];
  
  // Filter by category if provided
  if (req.query.category) {
    result = result.filter(doc => 
      doc.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }
  
  // Filter by tag if provided
  if (req.query.tag) {
    result = result.filter(doc => 
      doc.tags.some(tag => tag.toLowerCase() === req.query.tag.toLowerCase())
    );
  }
  
  // Search in title and content if provided
  if (req.query.search) {
    const searchTerm = req.query.search.toLowerCase();
    result = result.filter(doc => 
      doc.title.toLowerCase().includes(searchTerm) || 
      doc.content.toLowerCase().includes(searchTerm)
    );
  }
  
  // Return only metadata, not full content
  const metadata = result.map(doc => ({
    id: doc.id,
    title: doc.title,
    category: doc.category,
    author: doc.author,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    tags: doc.tags,
    attachments: doc.attachments
  }));
  
  setTimeout(() => {
    res.json({
      documents: metadata,
      count: metadata.length,
      total: documents.length
    });
  }, 800);
});

// GET a specific document
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const document = documents.find(doc => doc.id === id);
  
  if (!document) {
    return res.status(404).json({ error: "Document not found" });
  }
  
  setTimeout(() => {
    res.json(document);
  }, 600);
});

// GET document categories
router.get("/categories/all", (_req, res) => {
  const categories = [...new Set(documents.map(doc => doc.category))];
  
  setTimeout(() => {
    res.json({ categories });
  }, 300);
});

// GET document tags
router.get("/tags/all", (_req, res) => {
  const allTags = documents.flatMap(doc => doc.tags);
  const uniqueTags = [...new Set(allTags)];
  
  // Count occurrences of each tag
  const tagCounts = uniqueTags.map(tag => {
    const count = allTags.filter(t => t === tag).length;
    return { tag, count };
  }).sort((a, b) => b.count - a.count); // Sort by popularity
  
  setTimeout(() => {
    res.json({ tags: tagCounts });
  }, 300);
});

export default router;
