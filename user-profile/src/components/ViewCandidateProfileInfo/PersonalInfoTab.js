import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import styles from "../CandidateAcademicInfo/CandidateAcademicInfo.module.css";
import Heading from "../Heading/Heading";

export default function PersonalInfoTab({ userId }) {
  const [personalData, setPersonalData] = useState();

  useEffect(() => {
    const personalInfo = () => {
      fetch(`http://192.168.0.129:5000/api/personal_information/users/1`)
        .then(async (response) => {
          const data = await response.json();
          console.log(data);
          setPersonalData(data);
        })
        .catch((err) => {
          console.log("Hello! I caught this error.");
        });
    };
    personalInfo();
  }, []);

  return (
    <div>
      <Heading
        text={"Personal Information"}
        className={styles.personalInfoHeading}
      />
      <Heading
        text={"Basic Info"}
        className={styles.personalInfoHeading}
        type="medium"
      />

      {/* *************************************Table******************************************* */}
      {personalData && (
        <table className={styles.eduTable} style={{ width: "60%" }}>
          <tr>
            <td>FullName:</td>
            <td>{`${personalData.firstName} ${personalData.lastName}`}</td>
            <td>Merital Status:</td>
            <td>{personalData.maritalStatus}</td>
          </tr>
          <tr>
            <td>Gender:</td>
            <td>{personalData.gender}</td>
            <td>Phone Number:</td>
            <td>{personalData.phoneNumber}</td>
          </tr>
          <tr>
            <td>Date Of Birth:</td>
            <td>{personalData.dateOfBirth}</td>
            <td>CNIC:</td>
            <td>{personalData.nationalIdentityNumber}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{personalData.email}</td>
            <td>city:</td>
            <td>{personalData.city}</td>
          </tr>
          <tr>
            <td>LinkedIn Profile:</td>
            <td colSpan="3">{personalData.linkedProfile}</td>
          </tr>
          <tr>
            <td>Address:</td>
            <td colSpan="3">{personalData.address}</td>
          </tr>
        </table>
      )}
    </div>
  );
}
