import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PatientDetails.css';

function PatientDetails() {
  const { name } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    axios.get(`/api/patient?name=${name}`)
      .then((response) => {
        setPatient(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [name]);

  return (
    <div className="patient-details">
      <h1>Patient Details</h1>
      {patient ? (
        <div className="patient-details-container">
          <p className="patient-details-label">Name: <span className="patient-details-value">{patient.name}</span></p>
          <p className="patient-details-label">Age: <span className="patient-details-value">{patient.age}</span></p>
          <p className="patient-details-label">Email: <span className="patient-details-value">{patient.email}</span></p>
          <p className="patient-details-label">Phone: <span className="patient-details-value">{patient.phone}</span></p>
          <p className="patient-details-label">Appointment Date: <span className="patient-details-value">{patient.appointmentDate}</span></p>
          <p className="patient-details-label">Appointment Time: <span className="patient-details-value">{patient.appointmentTime}</span></p>
          <p className="patient-details-label">Doctor Name: <span className="patient-details-value">{patient.doctorName}</span></p>
        </div>
      ) : (
        <p className="loading-message">Loading patient details...</p>
      )}
    </div>
  );
}

export default PatientDetails;