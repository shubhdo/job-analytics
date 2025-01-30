const puppeteer = require('puppeteer');
const Job = require('./models/jobModel');
const logger = require('../../shared/logger/logger')

// Function to fetch job data using Puppeteer
const fetchJobs = async () => {
    try {
        // Launching the browser
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        // Go to the Naukri.com jobs page
        const url = "https://www.naukri.com/jobs-in-india"; // Modify the URL to a more specific listing page if needed
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Wait for the job listings to load (wait for the class 'jobTuple' to appear)
        await page.waitForSelector('.srp-jobtuple-wrapper');

        // Extract the job details using page.evaluate() (executes code within the browser context)
        const jobs = await page.evaluate(() => {
            const jobListings = [];
            const jobElements = document.querySelectorAll('.srp-jobtuple-wrapper');
            jobElements.forEach(jobElement => {
            const jobTitle =jobElement.querySelector('a.title').textContent;

            // Extract company name
            const companyName =jobElement.querySelector('a.comp-name').textContent.trim();

            // Extract location
            const location =jobElement.querySelector('span.locWdth').textContent.trim();

            // Extract experience
            const experience =jobElement.querySelector('span.expwdth').textContent.trim();

            // Extract skills (list of tags)
            const skills = [];
            jobElement.querySelectorAll('ul.tags-gt li').forEach((skillElement) => {
                skills.push(skillElement.textContent);
            });
                jobListings.push({
                    jobTitle: jobTitle,
                    company: companyName,
                    location: location,
                    experience: experience,
                    skills: skills
                });
            });

            return jobListings;
        });
        const result = await Job.insertMany(jobs);

        // Log the job listings to the console
        jobs.forEach(job => {
            logger.info(`Job Title: ${job.title}`);
            logger.info(`Company: ${job.company}`);
            logger.info(`Location: ${job.location}`);
            logger.info(`Experience: ${job.experience}`);
            logger.info(`Skills: ${job.skills}`);
            logger.info("-".repeat(50));
        });
        
        // Close the browser
        await browser.close();
    } catch (error) {
        logger.error('Error fetching job data:', error);
    }
};
// Function to scrape job data from Naukri with pagination
async function scrapeJobData() {
    // Launch a new browser instance
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  
    // Define the URL to scrape (example URL of Naukri job listings)
    const baseUrl = 'https://www.naukri.com/jobs-in-india';
  
    // Set the number of pages to scrape (adjust this to scrape more pages)
    const numberOfPages = 5; // For example, scraping the first 5 pages
  
    let jobData = []; // To store the scraped job data
  
    // Loop through pages
    for (let pageIndex = 1; pageIndex <= numberOfPages; pageIndex++) {
      // Navigate to the current page URL (pagination by adding `&page=`)
      let url = `${baseUrl}`;
      if(pageIndex > 1) {
          url = `${baseUrl}-${pageIndex}`;
      }
      await page.goto(url, { waitUntil: 'domcontentloaded' });
  
      // Wait for job listings to load
      await page.waitForSelector('.srp-jobtuple-wrapper'); // Ensure job items are present
  
      // Scrape the job data from the page
      const jobsOnPage = await page.evaluate(() => {
        // Array to store jobs on the current page
        let jobs = [];
  
        // Get all job listing elements
        const jobElements = document.querySelectorAll('.srp-jobtuple-wrapper');
  
        jobElements.forEach((jobElement) => {
          const jobTitle =jobElement.querySelector('a.title').textContent;
  
          // Extract company name
          const companyName =jobElement.querySelector('a.comp-name').textContent.trim();
  
          // Extract location
          const location =jobElement.querySelector('span.locWdth').textContent.trim();
  
          // Extract experience
          const experience =jobElement.querySelector('span.expwdth').textContent.trim();
  
          // Extract skills (list of tags)
          const skills = [];
          jobElement.querySelectorAll('ul.tags-gt li').forEach((skillElement) => {
              skills.push(skillElement.textContent);
          });        // Store the job details in an object
            jobs.push({
              jobTitle,
              company: companyName,
              location,
              experience,
              skills
            });
        });
  
        return jobs;
      });
  
      // Add jobs from this page to the total job data
      jobData = jobData.concat(jobsOnPage);
      console.log(`Scraped page ${pageIndex}: ${jobsOnPage.length} jobs`);
    }
  
    // Close the browser instance after scraping
    await browser.close();
    await insertDataInChunks(jobData);

    // Return the final job data
    return jobData;
  }

  // Function to insert data into MongoDB in chunks
async function insertDataInChunks(data) {
    const chunkSize = 100; // Number of records to insert per chunk
  
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
  
      try {
        // Insert the chunk into the MongoDB database
        await Job.insertMany(chunk);
        console.log(`Inserted ${chunk.length} records into MongoDB`);
      } catch (err) {
        console.error('Error inserting data chunk:', err);
      }
    }
  }
  
//   Run the function and log the result
//   scrapeJobData()
//     .then((data) => {
//       console.log('Total Jobs Scraped:', data.length);
//       console.log(data); // Output the scraped job data
//     })
//     .catch((err) => {
//       console.error('Error scraping data:', err);
//     });

module.exports = {
    fetchJobs,
    scrapeJobData
}
