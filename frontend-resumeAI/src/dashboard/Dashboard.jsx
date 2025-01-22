import './dashboard.css'
import  { useState } from 'react';
import axios from "axios";

const Dashboard = () => {
    const [fileLabel, setFileLabel] = useState('Drag and drop your file here or click to upload');
    const [selectedFiles, setSelectedFiles] = useState([]); // Store selected files
    const [answer ,setAnswer] = useState('');

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const fileNames = files.map((file) => file.name).join(', ');
            setFileLabel(fileNames);
            setSelectedFiles(files); // Update state with selected files
        } else {
            setFileLabel('Drag and drop your file here or click to upload');
            setSelectedFiles([]); // Reset when no files are selected
        }
    };

    const handleFileDelete = () => {
        setFileLabel('Drag and drop your file here or click to upload'); // Reset label text
        setSelectedFiles([]); // Reset selected files
        setAnswer("");
        const fileInput = document.getElementById('file-input');
        if (fileInput) {
            fileInput.value = ''; // Clear the value of the file input
        }
    };


    const handleSkillsButton = async () => {
        if (selectedFiles.length === 0) {
            alert('Please select a file!');
            return;
        }

        const formData = new FormData();
        formData.append('resume', selectedFiles[0]);

        try {
            const response = await axios.post('http://localhost:8020/skills', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Suggested Skills:', response.data);
            setAnswer(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    const handleDescriptionButton = async () => {
        if (selectedFiles.length === 0) {
            alert('Please select a file!');
            return;
        }

        const formData = new FormData();
        formData.append('resume', selectedFiles[0]);

        try {
            const response = await axios.post('http://localhost:8020/description', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Suggested Skills:', response.data);
            setAnswer(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };




    return (
        <div className="container">
            <div className="upload-page">
                <div className="upload-container">
                    <h1>Upload Your File</h1>
                    <label htmlFor="file-input" className="upload-box">
                        <span>{fileLabel}</span>
                        <input
                            type="file"
                            id="file-input"
                            accept={"application/pdf"}
                            onChange={handleFileChange}
                            style={{display: 'none'}}
                        />
                        {selectedFiles.length > 0 && (
                            <button className="delete-btn" onClick={handleFileDelete}>
                                Delete File
                            </button>
                        )}
                    </label>

                </div>
                <div className="suggestion-box">
                    <button onClick={handleDescriptionButton}>review descriptions</button>
                    <button onClick={handleSkillsButton}>suggest additional skills</button>
                </div>

            </div>

            {answer ==="" ?(<></>) : (
                <div className="answer-box">
                        <p>
                            {answer}
                        </p>
                </div>
            )}

        </div>

    );
};

export default Dashboard;
