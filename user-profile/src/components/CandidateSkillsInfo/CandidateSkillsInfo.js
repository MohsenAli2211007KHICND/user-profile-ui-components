import React, { useCallback, useEffect, useRef, useState } from "react";
import Heading from "../Heading/Heading";
import styles from "../CandidateAcademicInfo/CandidateAcademicInfo.module.css";
import InputField from "../InputField/InputField";
import DropdownField from "../DropdownField/DropdownField";
import Button from "../Button/Button";
import { message, Popconfirm } from "antd";

export default function CandidateskillInfo() {
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("");
  const [skillData, setSkillData] = useState([]);
  const [certificate, setCertificate] = useState();
  const [certificateData, setCertificateData] = useState([]);
  const [id, setId] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  // const [userId, setUserId] = useState(sessionStorage.getItem("user_id"));
  const [userId, setUserId] = useState(1);

  const fileRef = useRef();

  const basicRoute =
    "http://userprofileserviceapplication3-env.eba-pm56e7xe.us-east-1.elasticbeanstalk.com/api/users/skills";
  const getSkillsbyUserId = `${basicRoute}/${userId}`;
  const postUrl = `${basicRoute}`
  const deleteUrl = `${basicRoute}/${deleteId}`

  useEffect(() => {
    fetch(getSkillsbyUserId)
      .then(async (response) => {
        console.log(response);
        const data = await response.json();
        console.log(data);
        setSkillData(data);
      })
      .catch((err) => {
        console.log("Hello! I caught this error.");
      });
  }, []);

  const handleskill = useCallback((value) => {
    setSkill(value);
  }, []);
  const handleLevel = useCallback((value) => {
    setLevel(value);
  }, []);
  const handleCertificate = useCallback((value) => {
    setCertificate(value);
  }, []);

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   if (skillData.length !== 0) {
  //     for (let element of skillData) {
  //       if (element.skill === skill) {
  //         alert(`${skill} Already exists`);
  //         setSkill("");
  //         setLevel("");
  //         return;
  //       }
  //       console.log('hi')
  //     }
  //     setSkillData([...skillData, { id, skill, level }]);
  //     setSkill("");
  //     setLevel("");
  //   }
  //   setSkillData([...skillData, { id, skill, level }]);
  //   setSkill("");
  //   setLevel("");
  //   setId(id + 1);
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    for (let element of skillData) {
      if (element.skill === skill) {
        alert(`${skill} Already exists`);
        setSkill("");
        setLevel("");
        return;
      }
    }

    const obj = {
      userId,
      skill,
      proficiency: level
    }

    console.log(obj);
    fetch(postUrl, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(obj),
    })
      .then(async (response) => {
        const data = await response.json();
        console.log(response);
        console.log(data)
        // const res = response ? response.ok : false;
        // const updateUser = res
        //   ? "Info saved successfully!"
        //   : "Error saving info!";
        // setDisNextBtn(!res);
        // if (res) {
        //   messageApi.success(updateUser);
        // } else {
        //   messageApi.error(updateUser);
        // }
        setSkillData([...skillData, data]);
      })
      .catch((err) => {
        console.log(err);
        // const updateUser = "Error saving info!";
        // messageApi.error(updateUser);
        // setDisNextBtn(true);
      });

    setSkill("");
    setLevel("");
  };

  const upload = (e) => {
    e.preventDefault();
    if (certificate) {
      setCertificateData([...certificateData, certificate]);
      setCertificate(null);
      fileRef.current.value = null;
    }
  };
  // console.log(certificateData);

  const onDelete = (id) => {
    setDeleteId(id);
  };

  const deleteField = () => {
    fetch(deleteUrl, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((response) => {
        const res = response ? response.ok : false;
        console.log(response);
        if (res) {
          // messageApi.success("Details deleted successfully!");
          const newData = skillData.filter((item) => item.id !== deleteId);
          setSkillData(newData);
        } 
        // else {
        //   messageApi.error("Error deleting details!");
        // }

        setDeleteId(null);
      })
      .catch((err) => {
        // messageApi.error("Error deleting details!");
        console.log(err); 
        setDeleteId(null);
      });
  };

  const dontDeleteField = () => {
    setDeleteId(null)
  }
  //     fetch(`${deleteUrl}/${deleteId}`, {
  //         method: 'DELETE',
  //         mode: 'cors',
  //         cache: 'no-cache',
  //         credentials: 'same-origin',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         redirect: 'follow',
  //         referrerPolicy: 'no-referrer',
  //     })
  //         .then(response => {
  //             const res = response ? response.ok : false;
  //             console.log(response)
  //             if (res) {
  //                 messageApi.success('Details deleted successfully!')
  //                 const newData = eduData.filter((item) => item.id !== deleteId);
  //                 setEduData(newData)
  //             }
  //             else {
  //                 messageApi.error('Error deleting details!')
  //             }

  //             setDeleteId(null);

  //         })
  //         .catch((err) => {
  //             messageApi.error('Error deleting details!')
  //             console.log(err)
  //             setDeleteId(null);
  //         })
  // }

  return (
    <div className={styles.mainContainer} style={{ display: "block" }}>
      <form className={styles.formPersonalInfo} onSubmit={onSubmit}>
        <Heading className={styles.personalInfoHeading} text="skill" />{" "}
        <table style={{ width: "50%" }}>
          <th>Skills</th>
          <th>Proficiency</th>
          <th></th>
          {skillData.map((element, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{element["skill"]}</td>
                <td>{element["level"]}</td>
                <td>
                  <Popconfirm
                    title="Delete details"
                    description="Are you sure to delete this details?"
                    onConfirm={deleteField}
                    // onCancel={dontDeleteField}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      onClick={() => onDelete(element.id)}
                      type="button"
                      text={<i class="fa fa-trash"></i>}
                    />
                  </Popconfirm>
                </td>
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
          accept=".pdf, .odf"
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
