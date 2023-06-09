const express = require('express');
const router = express.Router();
const Dashboard = require('./models/dashboard');
const Appointment = require('./models/appointment');
const Patient = require('./models/patient');

// Dashboard route
router.get('/dashboard', async (req, res) => {
  try {
    // Fetch data from the Dashboard collection
    
    const dashboardData = await Dashboard.find({});
    console.log(dashboardData)
    res.json(dashboardData[0]);
  } catch (error) {
    console.error('Error retrieving dashboard data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Appointment Scheduling route
router.post('/appointment', async (req, res) => {
  try {
    // Create a new Appointment instance using the request body data
    const appointment = new Appointment(req.body);
    // Save the appointment to the database
    const savedAppointment = await appointment.save();
    const dashboard = await Dashboard.find({});
    console.log(dashboard)
    if(dashboard[0]?.totalAppointments) dashboard[0].totalAppointments++;
    else dashboard[0].totalAppointments = 1;
    await dashboard[0].save();
    res.json(savedAppointment);
  } catch (error) {
    console.error('Error saving appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Patient Registration route
router.post('/patient', async (req, res) => {
  try {
    // Create a new Patient instance using the request body data
    const patient = new Patient(req.body);
    const dashboard = await Dashboard.find({});
    console.log(dashboard)
    if(dashboard[0]?.totalPatients) dashboard[0].totalPatients++;
    else dashboard[0].totalPatients = 1;
    await dashboard[0].save();
    // Save the patient to the database
    console.log(req.body, patient)
    const savedPatient = await patient.save();
    res.json(savedPatient);
  } catch (error) {
    console.error('Error saving patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Patient Details route
router.get('/patient/:name', async (req, res) => {
  try {
    const {name} = req.params;
    // Fetch patient details from the database
    console.log( name)
    const patient = await Patient.findOne({name:name });
    console.log(patient)
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error('Error retrieving patient details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Appointment List route
router.get('/appointmentlist', async (req, res) => {
  try {
    // Fetch all appointments from the database
    const appointmentList = await Appointment.find();
    res.json(appointmentList);
  } catch (error) {
    console.error('Error retrieving appointment list:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
