import React, { useState } from 'react';
import { Chart} from 'chart.js';
import axios from 'axios';

const ChartComponent = () => {
    const [data, setData] = useState()
    const [file, setFile] = useState()
    const [isLoading, setIsLoading] = useState(false)

    //Function to handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    //Function to handle file upload
    const handleUpload = async () => {
        if(!file){
            alert('Please select a file')
            return;
        }
        //Set the state to true while uploading
        setIsLoading(true)

        //Create a FormData object to send the file
        const formData = new FormData();
        formData.append('file', file)

        try{
            // Sending the File to the backend via POST request
            const res = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' //Setting the content type for file upload
                }
            })

            setData(res.data);

            renderChart(res.data);
        } catch(error){
            // If there is an error, it will log during upload process
            console.error('There was an error while uploading the file', error)
        } finally{
            //Setting the state back to false after the upload is completed
            setIsLoading(false)
        }
    }


    return (
        <div>
            <h1>Data Analytics Dashboard</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>
                {isLoading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    )

    }
