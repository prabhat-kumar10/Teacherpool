const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
require("./db/connection.js");
const User = require("./db/user.js")
const JobRole = require('./db/jobOpening.js')
const cors = require("cors")
const bcrypt = require("bcryptjs");

//enable cors
app.use(cors());

//Middleware for parsing JSON
app.use(express.json());

//Signing Up
app.post('/signup', async (req, res) => {
   try {
      const { fullname, phone, email, password } = req.body;
      // console.log(req.body);

      const user = new User({ fullname, phone, email, password });
      await user.save();
      res.status(201).json({ message: 'Signed up successfully' });
   }
   catch (error) {
      console.log("hello error");
      res.status(500).json({ error: "Sign up failed" });
   }
})

//Login
app.post('/login', async (req, res) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
         return res.status(401).json({ message: "Email is not correct" });
      }

      // if (user.password !== password) {
      //    return res.status(401).json({ message: "Password is not correct" });
      // }

      // res.status(200).json({ message: "Login Successful", user });
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
         return res.status(401).json({ message: "Password is not correct" });
      }

        res.status(200).json({ message: "Login Successful", user });
   }
   catch (error) {
      res.status(500).json({ error: "Login failed" });
   }
})

//add job opening
app.post('/add_job', async (req, res) => {
   try {

      const { title, role, experience, qualification, skills, additionalRequirements, location, remunerationAndBenefits, organizationName, photoUrl, applyUrl } = req.body;
      const opening = new JobRole({ title, role, experience, qualification, skills, additionalRequirements, location, remunerationAndBenefits, organizationName, photoUrl, applyUrl });
      await opening.save();
      // console.log(opening);
      res.status(200).json({
         job: opening,
         status: "200",
         message: "new job added successfully",
      });

   } catch (error) {
      res.status(500).json({ error: "error in adding job opening" });
   }
})

app.get('/get_job_openings', async (req, res) => {
   try {
      const jobOpenings = await JobRole.find(); // Assuming SchoolInfo is your Mongoose model
      res.status(200).json(jobOpenings);
   } catch (error) {
      console.error('Error fetching job openings:', error);
      res.status(500).json({ error: 'Error fetching job openings' });
   }
});

app.patch('/remove_job', async (req, res) => {
   const { organizationName, title, applyUrl } = req.body;
   console.log(req.body);
   try {
      // Find and remove the job based on all properties
      const deletedJob = await JobRole.findOneAndDelete({
         organizationName, title, applyUrl
      });

      if (!deletedJob) {
         return res.status(404).json({ message: 'Job not found' });
      }

      return res.status(200).json({ message: 'Job removed successfully' });
   } catch (error) {
      console.error('Error removing job:', error);
      return res.status(500).json({ message: 'Internal server error' });
   }
})

app.listen(port, () => {
   console.log("server is listening");
})