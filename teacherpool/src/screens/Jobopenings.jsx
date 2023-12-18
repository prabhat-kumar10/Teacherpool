import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import '../styles/Jobopeningstyle.css';
import { useAuth } from "../AuthContext";

const Jobopenings = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated } = useAuth();

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
    if(isAuthenticated)
    {
      window.open(applyUrl, '_blank');
    }
    else
    {
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
  
  return (
    <>
      <NavBar />
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
          </div>
        ))}
      </div>
    </>
  );
};

export default Jobopenings;
