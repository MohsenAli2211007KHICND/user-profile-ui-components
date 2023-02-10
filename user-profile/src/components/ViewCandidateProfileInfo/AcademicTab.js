import React, { useEffect, useState } from 'react'
import Heading from '../Heading/Heading'
import styles from '../CandidatePersonalInfo/CandidatePersonalInfo.module.css'


export default function AcademicTab() {
  const [acdemicData, setAcademicData] = useState("");

  useEffectect(() => {
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
        <Heading text="Academic Information" className= {styles.personalInfoHeading}/>

    </div>
  );
}
