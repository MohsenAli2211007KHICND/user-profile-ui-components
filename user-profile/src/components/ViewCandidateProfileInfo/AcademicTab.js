import React, { useEffect, useState } from 'react'
import Heading from '../Heading/Heading'
import styles from '../CandidatePersonalInfo/CandidatePersonalInfo.module.css'


export default function AcademicTab({ academicData }) {
  // const [academicData, setAcademicData] = useState([]);

  // useEffect(() => {
  //   const academicInfoReq = () => {
  //     fetch(`http://userprofileserviceelastic-env.eba-piepztun.ap-south-1.elasticbeanstalk.com/api/educational_information/user/24`)
  //       .then(async (response) => {
  //         console.log(response);
  //         const data = await response.json();
  //         console.log(data);
  //         setAcademicData(data);
  //       })
  //       .catch((err) => {
  //         console.log(err, "Hello I caught this error!");
  //       });
  //   };
  //   academicInfoReq();
  // },[]);

  return (
    <div>
        <Heading text="Academic Information" className= {styles.personalInfoHeading}/>
        <div>
          {academicData && academicData.map(({cgpa, currentDegree, degreeProgress, finalYearProject, graduationDate, id, institute, title}) => {
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
          })}
        </div>

    </div>
  );
}
