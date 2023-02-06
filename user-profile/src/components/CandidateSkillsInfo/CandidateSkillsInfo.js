import React, { useCallback, useRef, useState } from "react";
import Heading from "../Heading/Heading";
import styles from "../CandidateAcademicInfo/CandidateAcademicInfo.module.css";
import InputField from "../InputField/InputField";
import DropdownField from "../DropdownField/DropdownField";
import Button from "../Button/Button";
export default function CandidateskillInfo() {
  const [skill, setskill] = useState("");
  const [level, SetLevel] = useState("");
  const [skillData, SetskillData] = useState([{ skill: "java", level: "7" }]);
  const [certificate, setCertificate] = useState();
  const [certificateData, setCertificateData] = useState([]);
  // const [selectedFile,setselectedFile] = useState();

  const fileRef = useRef();

  const handleskill = useCallback((value) => {
    setskill(value);
  });
  const handleLevel = useCallback((value) => {
    SetLevel(value);
  });
  const handleCertificate = useCallback((value) => {
    setCertificate(value);
    // setselectedFile(value);
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (skillData.length !==0) {
      for (let element of skillData) {
        if (element.skill === skill) {
          alert(`${skill} Already exists`);
          setskill("");
          SetLevel("");
          return;
        }
      }
      SetskillData([...skillData, { skill, level }]);
      setskill("");
      SetLevel("");
    }
  };

    const upload = (e) => {
    e.preventDefault();
    if(certificate){
      // console.log("inside condition")
      setCertificateData([...certificateData, certificate]);
      setCertificate(null);
      fileRef.current.value = null;

    }

    // ---xxxxxxxxxxx--------------
    // if (certificateData.length !== 0) {
    //   for (let element of certificateData) {
    //     if (element === certificate) {
    //       alert(`${certificate.name} Already exist`);
    //       setCertificate(null);
    //       return;
    //       console.log('hello')
    //     }
    //     console.log('hello1')
    //   }
    //   setCertificateData([...certificateData, certificate]);
    //   setCertificate(null);
    //   // setselectedFile('');
    //   fileRef.current.value = null;
    //   console.log(fileRef.current.value);
    // }
    // else if (certificate) {
    //   setCertificateData([...certificateData, certificate]);
    //   fileRef.current.value = null;
    //   setCertificate(null);
    // }
    // console.log(certificate);


  };
  console.log(certificateData);

  return (
    <div className={styles.mainContainer} style={{ display: "block" }}>
      <form className={styles.formPersonalInfo} onSubmit={onSubmit}>
        <Heading className={styles.personalInfoHeading} text="skill" />{" "}
        <table style={{ width: "50%" }}>
          <th>Skills</th>
          <th>Proficiency</th>
          {skillData.map((element, index) => {
            return (
              <tr key={index}>
                <td>{element["skill"]}</td>
                <td>{element["level"]}</td>
              </tr>
            );
          })}
        </table>
        <InputField
          value={skill}
          handler={handleskill}
          type="text"
          placeholder="skill"
          className={styles.halfSize}
          required="required"
        />
        <DropdownField
          value={level}
          handler={handleLevel}
          options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          placeholder="Level"
          className={styles.halfSize}
        />
        <Button type="submit" text="Add" className={styles.saveButton} />
      </form>

      {/* ----------------xxxxxxxxxxxxx-------------------- */}

      <form className={styles.formPersonalInfo} onSubmit={upload}>
        <Heading className={styles.personalInfoHeading} text="Certificates" />{" "}
        <table style={{ width: "50%" }}>
          <th>Certificates</th>
          {certificateData.map((element, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{element.name}</td>
              </tr>
            );
          })}
        </table>
        <InputField
          refling={fileRef}
          accept = '.pdf, .odf'
          // value={certificate}
          handler={handleCertificate}
          type="file"
          placeholder=""
          className={styles.halfSize}
          
        />
        <Button type="submit" text="Upload" className={styles.saveButton} />
      </form>
    </div>
  );
}
