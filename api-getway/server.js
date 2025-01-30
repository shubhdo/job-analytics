const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const cors = require('cors');

// Define the internal ports for the microservices
const JOB_SERVICE_PORT = 'http://localhost:5001';
const USER_SERVICE_PORT = 'http://localhost:5002';

app.use(cors()); // This allows requests from all origins

// Setup routes and forward requests to corresponding services
app.use('/api/jobs', createProxyMiddleware({
  target: JOB_SERVICE_PORT,
  changeOrigin: true,
}));

app.use('/api/users', createProxyMiddleware({
  target: USER_SERVICE_PORT,
  changeOrigin: true,
}));


// Start the API Gateway server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
