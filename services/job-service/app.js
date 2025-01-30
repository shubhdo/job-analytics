const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authMiddleware = require('../../shared/middleware/authMiddleware');
const logger = require('../../shared/logger/logger');
const Job = require('./models/jobModel');
const { scrapeJobData } = require('./fetchData');
require('./cronJob')
dotenv.config();  // Load environment variables

const app = express();
app.use(express.json());  // Middleware to parse JSON requests

// Database connection
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,  // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, 
    }).then(() => {
      logger.info('Database connected');
    }).catch((err) => {
      logger.error('Database connection error:', err);
    });
// Routes
app.get('/', async (req, res) => {
    try {
        const jobs = await Job.find({});
        res.status(201).json({
            message: 'job fetched successfully',
            jobs
          });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Starting the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

  scrapeJobData()
    .then((data) => {
      console.log('Total Jobs Scraped:', data.length);
      // console.log(data); // Output the scraped job data
    })
    .catch((err) => {
      console.error('Error scraping data:', err);
    });
