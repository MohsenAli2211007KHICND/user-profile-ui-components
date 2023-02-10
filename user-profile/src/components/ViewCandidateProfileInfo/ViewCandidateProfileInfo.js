import React, { useState } from "react";
import Button from "../Button/Button";
import AcademicTab from "./AcademicTab";
import PersonalInfoTab from "./PersonalInfoTab";
import SkillsTab from "./SkillsTab";
import WorkTab from "./WorkTab";

export default function ViewCandidateProfileInfo() {
  const [view, setView] = useState("skills-info");
  const userId = 1

  let render;

  switch (view) {
    case "personal-info":
      render = <PersonalInfoTab userId={userId} />;
      break;
    case "academic-info":
      render = <AcademicTab userId={userId} />;
      break;
    case "work-info":
      render = <WorkTab userId={userId} />
      break;
    case "skills-info":
      render = <SkillsTab userId={userId} />;
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
