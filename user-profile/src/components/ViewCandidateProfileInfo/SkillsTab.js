import React, { useEffect, useState } from "react";
import styles from "../CandidatePersonalInfo/CandidatePersonalInfo.module.css";
import Heading from "../Heading/Heading";
import { Divider, Space, Tag } from 'antd';

const skillMock = [
    {
        "id": 17,
        "userId": 1,
        "skill": "Python",
        "proficiency": 9
    },
    {
        "id": 23,
        "userId": 1,
        "skill": "Java",
        "proficiency": 4
    },
    {
        "id": 23,
        "userId": 1,
        "skill": "Java",
        "proficiency": 6
    },
    {
        "id": 23,
        "userId": 1,
        "skill": "Java",
        "proficiency": 4
    }
]

export default function SkillsTab({ skillsData }) {
  // const [skillInfo, setSkillInfo] = useState([]);

  // useEffect(() => {
  //   const skillsReq = () => {
  //     fetch(`http://userprofileserviceelastic-env.eba-piepztun.ap-south-1.elasticbeanstalk.com/api/users/skills/1`)
  //       .then(async (response) => {
  //         const skillData = await response.json();
  //         console.log(skillData);
  //         setSkillInfo(skillData);
  //       })
  //       .catch((err) => {
  //         console.log(err, "Hello! I caught this error.");
  //       });
  //   };
  //   skillsReq();
  // }, []);

  const giveMeSkillLevel = (proficiency) => {
    if (proficiency <= 5) {
      return ["BEGINNER", "#e64219"];
    } else if (proficiency > 5 && proficiency <= 7) {
      return ["INTERMEDIATE", "#eb9915"];
    } else {
      return ["MASTER", "#15eb35"];
    }
  };

  return (
    <div>
      <Heading text="Skills" className={styles.personalInfoHeading}></Heading>
      <div style={{display: "flex"}}>
        {skillsData.map(({id, skill, proficiency, userId}) => {
            const [level, color] = giveMeSkillLevel(proficiency)
            return( <div>{skill} <Tag color={color} >{level}</Tag></div>)
        })}
      </div>
    </div>
  );
}
