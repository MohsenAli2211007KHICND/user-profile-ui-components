import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import AcademicTab from "./AcademicTab";
import PersonalInfoTab from "./PersonalInfoTab";
import SkillsTab from "./SkillsTab";
import WorkTab from "./WorkTab";

export default function ViewCandidateProfileInfo() {
  const [view, setView] = useState("personal-info");
  const userId = 1

  const [personlaData, setPersonalData] = useState();
  const [academicData, setAcademicData] = useState([]);
  const [workData, setWorkData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);

  const personalInfoUrl = 'http://userprofileserviceelastic-env.eba-piepztun.ap-south-1.elasticbeanstalk.com/api/personal_information/users/1';
  const academicInfoUrl = 'http://userprofileserviceelastic-env.eba-piepztun.ap-south-1.elasticbeanstalk.com/api/educational_information/user/24';
  const workInfoUrl = 'http://userprofileserviceelastic-env.eba-piepztun.ap-south-1.elasticbeanstalk.com/api/work_experience/user/24';
  const skillsInfoUrl = 'http://userprofileserviceelastic-env.eba-piepztun.ap-south-1.elasticbeanstalk.com/api/users/skills/1';

  let render;

  const fetchData = (url, setData) => {
    fetch(url)
      .then(async (response) => {
        const data = await response.json()
        console.log(data)
        setData(data)
      })
      .catch((error) => {
        console.log(error, "I caught this!")
      })
  }

  useEffect(() => {
    fetchData(personalInfoUrl, setPersonalData)
    fetchData(academicInfoUrl, setAcademicData)
    fetchData(workInfoUrl, setWorkData)
    fetchData(skillsInfoUrl, setSkillsData)
  }, [])

  switch (view) {
    case "personal-info":
      render = <PersonalInfoTab personalData={personlaData} />;
      break;
    case "academic-info":
      render = <AcademicTab academicData={academicData} />;
      break;
    case "work-info":
      render = <WorkTab workData={workData} />
      break;
    case "skills-info":
      render = <SkillsTab skillsData={skillsData} />;
      break;
    case "certificates-info":
      break;
    default:
      break;
  }

  return (
    <>
      <div>
        <Button onClick={() => setView("personal-info")} text="Personal Info" type="button" className={""} />
        <Button onClick={() => setView("academic-info")} text="Academic" type="button" className={""} />
        <Button onClick={() => setView("work-info")} text="Experience" type="button" className={""} />
        <Button onClick={() => setView("skills-info")} text="Skills" type="button" className={""} />
        <Button onClick={() => setView("certificates-info")} text="Certificates" type="button" className={""} />
      </div>
      <div>{render}</div>
    </>
  );
}
