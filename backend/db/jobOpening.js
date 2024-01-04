const mongoose = require('mongoose');

// Define the schema for your collection
const jobRoleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  skills: {
    type: String,
    required: true
  },
  additionalRequirements: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  remunerationAndBenefits: {
    type: String
  },
  organizationName: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String
  },
  applyUrl:{
    type: String,
    required: true
  }
});

// Create a model using the schema
const JobRole = mongoose.model('JobRole', jobRoleSchema);

module.exports = JobRole;
