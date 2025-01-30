import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';

// Register chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const DataVisualization = () => {
  const [jobs, setJobs] = useState([]);
  
  // Simulated data for job postings (This should be fetched from your API)
  useEffect(() => {
    const data = [
      { jobTitle: 'Full Stack Developer', company: 'Netlink Software', location: 'Kolkata', experience: '0-5 Yrs', skills: ['fullstack development', 'css', 'ui development'] },
      { jobTitle: 'Frontend Developer', company: 'XYZ Technologies', location: 'Mumbai', experience: '2-4 Yrs', skills: ['react.js', 'html', 'css'] },
      { jobTitle: 'Backend Developer', company: 'ABC Corp', location: 'Bengaluru', experience: '3-5 Yrs', skills: ['node.js', 'express.js', 'mongoDB'] },
      { jobTitle: 'Data Scientist', company: 'DataX', location: 'Chennai', experience: '1-3 Yrs', skills: ['python', 'machine learning', 'data analysis'] },
      { jobTitle: 'UX/UI Designer', company: 'DesignPro', location: 'Pune', experience: '0-2 Yrs', skills: ['ui design', 'figma', 'html'] },
      // More job listings
    ];

    setJobs(data);
    const fetchJobs = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/jobs');
          const data = await response.json();
          setJobs(data.jobs);
        } catch (err) {
        }
      };
  
      fetchJobs();
  }, []);
  
  // Prepare data for visualizations
  const locationCount = jobs.reduce((acc, job) => {
    acc[job.location] = (acc[job.location] || 0) + 1;
    return acc;
  }, {});

  const experienceCount = jobs.reduce((acc, job) => {
    acc[job.experience] = (acc[job.experience] || 0) + 1;
    return acc;
  }, {});

  const locations = Object.keys(locationCount);
  const locationValues = Object.values(locationCount);

  const experiences = Object.keys(experienceCount);
  const experienceValues = Object.values(experienceCount);

  // Bar Chart Data for Locations
  const locationData = {
    labels: locations,
    datasets: [
      {
        label: 'Job Count by Location',
        data: locationValues,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  // Pie Chart Data for Experience Levels
  const experienceData = {
    labels: experiences,
    datasets: [
      {
        data: experienceValues,
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
        hoverOffset: 4
      }
    ]
  };

  return (
    <div className="App">
      <h1>Naukri Job Data Visualizations</h1>

      {/* Bar Chart for Location Distribution */}
      <div style={{ width: '60%', margin: '0 auto' }}>
        <Bar data={locationData} options={{ responsive: true }} />
      </div>

      {/* Pie Chart for Experience Distribution */}
      <div style={{ width: '60%', margin: '20px auto' }}>
        <Pie data={experienceData} options={{ responsive: true }} />
      </div>

    </div>
  );
}

export default DataVisualization;
