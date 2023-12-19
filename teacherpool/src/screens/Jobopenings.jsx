import Footer from '../components/Footer'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import '../styles/Jobopeningstyle.css';
import { useAuth } from "../AuthContext";


const Jobopenings = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddJobPopup, setShowAddJobPopup] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    role: '',
    experience: 0,
    qualification: '',
    skills: '',
    additionalRequirements: '',
    location: '',
    remunerationAndBenefits: '',
    organizationName: '',
    photoUrl: '',
    applyUrl: '',
  });
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const fetchJobOpenings = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get_job_openings');
        setJobOpenings(response.data);
      } catch (error) {
        console.error('Error fetching job openings:', error);
      }
    };

    fetchJobOpenings();
  }, []);

  const handleApply = (applyUrl) => {
    // Open the applyUrl in a new tab
    if (isAuthenticated) {
      window.open(applyUrl, '_blank');
    }
    else {
      alert("Login first and then Apply for job");
    }
  };

  const handleSearch = async () => {
    try {
      // Fetch the original job openings data from the server
      const response = await axios.get('http://localhost:8000/get_job_openings');
      const originalJobOpenings = response.data;

      // Filter the job openings based on the search term
      const filteredJobOpenings = originalJobOpenings.filter((jobOpening) =>
        Object.values(jobOpening).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

      // Sort the filtered job openings to bring matching data to the top
      const sortedJobOpenings = [...filteredJobOpenings].sort((a, b) => {
        // You can customize the sorting logic here, e.g., by relevance
        return a.organizationName.localeCompare(b.organizationName);
      });

      setJobOpenings(sortedJobOpenings);
    } catch (error) {
      console.error('Error fetching and searching job openings:', error);
    }
  };

  const isAdmin = () => {
    return isAuthenticated && user.email.endsWith('@teacherpool.in');
  };

  const handleOpenAddJobForm = () => {
    setShowAddJobPopup(true);
  };

  const handleCloseAddJobForm = () => {
    setShowAddJobPopup(false);
  };



  const handleRemoveJob = async (jobOpening) => {
    try {
      console.log("hello nikhil")
      await axios.patch('http://localhost:8000/remove_job', {
        organizationName: jobOpening.organizationName,
        title: jobOpening.title,
        applyUrl: jobOpening.applyUrl,
      });
      const updatedJobOpenings = jobOpenings.filter(
        (existingJob) =>
          existingJob.organizationName !== jobOpening.organizationName ||
          existingJob.title !== jobOpening.title ||
          existingJob.applyUrl !== jobOpening.applyUrl
      );
      setJobOpenings(updatedJobOpenings);
    } catch (error) {
      console.error('Error removing job frontend:', error);
    }
  };
  const handleSaveJob = async () => {
    try {
      // Implement API request to save the new job
      await axios.post('http://localhost:8000/add_job', newJob);
      setShowAddJobPopup(false);
      setNewJob({
        title: '',
        role: '',
        experience: 0,
        qualification: '',
        skills: '',
        additionalRequirements: '',
        location: '',
        remunerationAndBenefits: '',
        organizationName: '',
        photoUrl: '',
        applyUrl: '',
      });
      // Fetch updated job openings after adding a new job
      const response = await axios.get('http://localhost:8000/get_job_openings');
      setJobOpenings(response.data);
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  return (
    <>
      <NavBar />
      {isAdmin() && (
        <div className='add-job-button-container'>
          <button className="add-job-button" onClick={handleOpenAddJobForm}>
            Add Job Role Here
          </button>
        </div>
      )}


      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for Job"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="searchbarbutton" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="job-openings-container">
        {jobOpenings.map((jobOpening, index) => (
          <div key={index} className="job-opening">
            <div className="image-container">
              <img src={jobOpening.photoUrl} alt={jobOpening.organizationName} />
            </div>
            <p>
              <strong>Organization Name:</strong> {jobOpening.organizationName}{' '}
              <br />
              <strong>Title:</strong> {jobOpening.title} <br />
              <strong>Role:</strong> {jobOpening.role} <br />
              <strong>Experience:</strong> {jobOpening.experience} years <br />
              <strong>Qualification:</strong> {jobOpening.qualification} <br />
              <strong>Skills:</strong> {jobOpening.skills} <br />
              <strong>Additional Requirements:</strong>{' '}
              {jobOpening.additionalRequirements} <br />
              <strong>Location:</strong> {jobOpening.location} <br />
              <strong>Remuneration and Benefits:</strong>{' '}
              {jobOpening.remunerationAndBenefits} <br />
            </p>
            <button
              className="applybutton"
              onClick={() => handleApply(jobOpening.applyUrl)}
            >
              Apply
            </button>
            {isAdmin() && (
              <button
                className="remove-button"
                onClick={() => handleRemoveJob(jobOpening)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      {showAddJobPopup && (
        <div className="add-job-popup">
          <p className='addjobtitle'>ADD JOB DESCRIPTION</p>
          <span className="close-button" onClick={handleCloseAddJobForm}>
            &times;
          </span>
          <label>Title *:</label>
          <input
            type="text"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
          />

          <label>Role *:</label>
          <input
            type="text"
            value={newJob.role}
            onChange={(e) => setNewJob({ ...newJob, role: e.target.value })}
          />

          <label>Experience *:</label>
          <input
            type="number"
            value={newJob.experience}
            onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
          />

          <label>Qualification *:</label>
          <input
            type="text"
            value={newJob.qualification}
            onChange={(e) => setNewJob({ ...newJob, qualification: e.target.value })}
          />

          <label>Skills *:</label>
          <input
            type="text"
            value={newJob.skills}
            onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
          />

          <label>Additional Requirements:</label>
          <input
            type="text"
            value={newJob.additionalRequirements}
            onChange={(e) => setNewJob({ ...newJob, additionalRequirements: e.target.value })}
          />

          <label>Location *:</label>
          <input
            type="text"
            value={newJob.location}
            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
          />

          <label>Remuneration and Benefits:</label>
          <input
            type="text"
            value={newJob.remunerationAndBenefits}
            onChange={(e) => setNewJob({ ...newJob, remunerationAndBenefits: e.target.value })}
          />

          <label>Organization Name *:</label>
          <input
            type="text"
            value={newJob.organizationName}
            onChange={(e) => setNewJob({ ...newJob, organizationName: e.target.value })}
          />

          <label>Photo URL:</label>
          <input
            type="text"
            value={newJob.photoUrl}
            onChange={(e) => setNewJob({ ...newJob, photoUrl: e.target.value })}
          />

          <label>Apply URL *:</label>
          <input
            type="text"
            value={newJob.applyUrl}
            onChange={(e) => setNewJob({ ...newJob, applyUrl: e.target.value })}
          />
          <div className='savejobbuttonstyle'>
            <button className="save-job-button" onClick={handleSaveJob}>
              Save Job
            </button>
          </div>
        </div>
      )}
    </>
  );
};


export default Jobopenings;
