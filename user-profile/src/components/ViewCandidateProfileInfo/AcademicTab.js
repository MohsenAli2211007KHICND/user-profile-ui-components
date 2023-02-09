import React, { useEffect, useState } from "react";
import Heading from "../Heading/Heading";
import styles from "../CandidatePersonalInfo/CandidatePersonalInfo.module.css";

export default function AcademicTab() {
  const [acdemicData, setAcademicData] = useState("");

  useEffect(() => {
    const academicInfo = () => {
      fetch("http://192.168.0.160:8080/api/educational_information")
        .then(async (response) => {
          console.log(response);
          const data = await response.json;
          console.log(data);
          setAcademicData(data);
        })
        .catch((err) => {
          console.log("Hello I caught this error!");
        });
    };
    academicInfo();
  },[]);

  return (
    <div>
      <Heading
        text="Academic Information"
        className={styles.personalInfoHeading}
      />
      <div>
        <table border={2}>
          <tr>
            <td>Degree : </td>
            <td>{}</td>
            <td>Degree Title : </td>
            <td>{}</td>
          </tr>
          <tr>
            <td>Graduation Date : </td>
            <td>{}</td>
            <td>CGPA : </td>
            <td>{}</td>
          </tr>
          <tr>
            <td>Institute/University : </td>
            <td>{}</td>
            {/* <td>Degree In Progress</td> */}
            <td>Final Year Project : </td>
            <td>{}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
