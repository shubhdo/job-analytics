const cron = require('node-cron');
const logger = require('../../shared/logger/logger')
const { fetchJobs } = require('./fetchData');

logger.info('cron script started');
// Schedule the job to run every day at midnight (00:00)
cron.schedule('0 0 0 * * *', () => {
  logger.info('Job is running at 12:00 AM');
  fetchJobs();
});


