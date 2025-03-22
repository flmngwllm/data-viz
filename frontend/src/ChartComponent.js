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

    }



    }
