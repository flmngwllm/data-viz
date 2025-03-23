import React, { useState } from 'react';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

Chart.register(...registerables);
const ChartComponent = () => {
    const [data, setData] = useState(null)
    const [file, setFile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    //Function to handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    //Function to handle file upload
    const handleUpload = async () => {
        if (!file) {
          alert("Please select a file first!");
          return;
        }
      
        console.log("Selected file:", file); // Debugging
      
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);
      
        try {
          console.log("Sending file to backend..."); // Debugging
          const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log("Response from backend:", response.data); // Debugging
          setData(response.data);
          renderChart(response.data);
        } catch (error) {
          console.error("There was an error uploading the file!", error.response ? error.response.data : error.message); // Debugging
        } finally {
          setIsLoading(false);
        }
      };

    const renderChart = (data) => {
        const ctx = document.getElementById('myChart').getContext('2d');

        //Creating a new Chart instance
        new Chart(ctx, {
            // Setting the type of chart
            type: 'bar',
            data: {
                // Using the keys of the mean object as labels
                labels: Object.keys(data.mean),
                datasets: [{
                    label: 'Mean', 
                    data: Object.values(data.mean),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })
    }
    return (
        <div>
            <h1>Data Analytics Dashboard</h1>
            {/* File input for selecting the file */}
            <p>Data: {JSON.stringify(data)}</p> {/* Debugging output */}
            <input type="file" onChange={handleFileChange} />
            {/* Button to upload the file and remove button while uploading*/}
            <button onClick={handleUpload}>
                {isLoading ? 'Uploading...' : 'Upload'}
            </button>
            <canvas id="myChart" width="400" height="200"></canvas>
        </div>
    )

    }

    export default ChartComponent;
