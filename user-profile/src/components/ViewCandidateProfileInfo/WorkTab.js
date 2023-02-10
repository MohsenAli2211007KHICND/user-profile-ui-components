import React, { useEffect, useState } from "react";
import styles from "../CandidateAcademicInfo/CandidateAcademicInfo.module.css";
import Heading from "../Heading/Heading";

export default function({userId}) {
    const [workData, setWorkData] = useState([]);

  useEffect(() => {
    const getReq = () => {
      fetch(`http://192.168.0.129:5000/api/work_experience/user/24`)
        .then(async (response) => {
          console.log(response);
          const data = await response.json();
          console.log(data);
          setWorkData(data);
        })
        .catch((err) => {
          console.log(err, "Hello I caught this error!");
        });
    };
    getReq();
  },[]);

  return (
    <div>
        <Heading text="Work Experience" className= {styles.personalInfoHeading}/>
        <div>
          {/* {workData.map(({cgpa, currentDegree, degreeProgress, finalYearProject, graduationDate, id, institute, title}) => {
            return(
              <div>
                <div>CGPA: {cgpa}</div>
                <div>degree:  {currentDegree}</div>
                <div>degree in progress: {degreeProgress}</div>
                <div>Fyp: {finalYearProject}</div>
                <div>Grad date: {graduationDate}</div>
                <div>Institute: {institute}</div>
                <div>degree title: {title}</div>
              </div>
            )
          })} */}
        </div>

    </div>
  );
}