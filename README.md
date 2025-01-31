# Naukri Scraper Microservices App

## 📌 Overview
This project is a **microservices-based application** that scrapes job listings from **Naukri.com** using **Puppeteer**, stores the extracted job data in **MongoDB**, and provides an API to serve the data. A **React frontend** fetches the data and presents job listings with **visualizations**.

## 🏗️ Architecture
The system consists of the following microservices:

1. **Scraper Service (Node.js + Puppeteer)**
   - Scrapes job data from Naukri.com.
   - Saves data into MongoDB.
   - Runs as a scheduled job or manual trigger.

2. **API Service (Node.js + Express + MongoDB)**
   - Fetches job data from MongoDB.
   - Provides a REST API for the frontend.

3. **Frontend Service (React.js + Charts.js/D3.js)**
   - Displays job listings.
   - Provides visual insights such as job trends, top companies, and salary distributions.

## 🚀 Tech Stack
- **Backend:** Node.js, Express, Puppeteer
- **Database:** MongoDB
- **Frontend:** React.js, Chart.js/D3.js
- **Containerization:** Docker (Optional)

## 📦 Setup & Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/) *(Optional)*

### Clone the Repository
```sh
git clone https://github.com/your-repo/naukri-scraper.git
cd naukri-scraper
```

### Backend (Scraper & API Services)
1. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```
2. **Setup Environment Variables:**
   Create a `.env` file in the `backend` directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/naukriDB
   PORT=5000
   ```
### Frontend (React App)
1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```
2. **Start the frontend:**
   ```sh
   npm start
   ```

The app will be running at: `http://localhost:3000`

## 📊 Features
✅ **Automated Job Scraping** using Puppeteer  
✅ **REST API** for job data retrieval  
✅ **Interactive UI** for job listings  
✅ **Data Visualizations** (Salary, Job Trends)  
✅ **Microservices Architecture** for scalability  

## 🤝 Contributing
Feel free to submit pull requests and report issues.

## 📜 License
MIT License © 2025 Your Name

