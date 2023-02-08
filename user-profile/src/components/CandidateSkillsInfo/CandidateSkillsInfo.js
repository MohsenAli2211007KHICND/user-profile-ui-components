import React, { useCallback, useEffect, useRef, useState } from "react";
import Heading from "../Heading/Heading";
import styles from "../CandidateAcademicInfo/CandidateAcademicInfo.module.css";
import InputField from "../InputField/InputField";
import DropdownField from "../DropdownField/DropdownField";
import Button from "../Button/Button";
import { message, Popconfirm } from "antd";
import style from "./CandidateSkillsInfo.module.css";

export default function CandidateskillInfo() {
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("");
  const [skillData, setSkillData] = useState([{id:"1",skill:"Java", level:"5"},
{id:"2",skill:"Python", level:"7"},
{id:"3",skill:"JavaScript", level:"7"}]);
  const [certificate, setCertificate] = useState("");
  const [certificateData, setCertificateData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  // -------------xxxxxxxxxx-----------certificate-xxxxxxxxxxxx-----------
  const [deleteFileId, setDeleteFileId] = useState();
  const [id, setId] = useState(1);
  // const [userId, setUserId] = useState(sessionStorage.getItem("user_id"));
  const [userId, setUserId] = useState(1);
  // const [filename, setFileName] = useState(sessionStorage.getItem("filename"));
  const [filename, setFileName] = useState("myResume");

  const fileRef = useRef();

  const basicRoute =
    "http://userprofileserviceapplication3-env.eba-pm56e7xe.us-east-1.elasticbeanstalk.com/api/users/skills";
  const getSkillsbyUserId = `${basicRoute}/${userId}`;
  const postUrl = `${basicRoute}`
  const deleteUrl = `${basicRoute}/${deleteId}`


  //const fileRoute = 'http://userprofileserviceapplication3-env.eba-pm56e7xe.us-east-1.elasticbeanstalk.com/api/file'
  const fileRoute = 'http://192.168.0.185:5000/api/file'

  const fileUploadUrl = `${fileRoute}/upload`
  const getAllFilesUrl = `${fileRoute}/user/${userId}`
  const downloadFileUrl = `${fileRoute}/download/${''}`
  const deleteFileUrl = `${fileRoute}/delete?id=${deleteFileId}&bucket_filename${''}`

  useEffect(() => {
    const fetchSkills = () => {
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
    }
    fetchSkills()

    const fetchCertificates = () => {
      fetch(getAllFilesUrl)
      .then(async (response) => {
        console.log(response);
        const data = await response.json();
        console.log(data);
        // setSkillData(data);
      })
      .catch((err) => {
        console.log("Hello! I caught this error.");
      });
    }
    fetchCertificates()
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

  //-----------xxxxxxxxx Cerificate Methods xxxxxxxxxxxxx----------------

  const upload = (e) => {
    e.preventDefault();
    if (certificate) {
      setCertificateData([...certificateData,{id, certificate}]);
      setCertificate(null);
      fileRef.current.value = null;
      setId(id+1);
      setFileName(certificate.name);     
       uploadFile(certificate,filename, userId)

    }

  };

  const uploadFile = (cert,filename,userId) => {
    let formData = new FormData();

    formData.append('file', cert);
    formData.append('user_id', userId);
    formData.append('filename', filename);

    // const obj = {
    //   "file":cert,
    //   "user_id":userId,
    //   filename
    // }

    fetch(fileUploadUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        // "Content-Type": "application/json",
        "Accept": 'application/json',
      },
      body: formData,
    })
      .then(async response => {
        console.log(response);
        const data = await response.json()
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      });
  }

  const deleteFile =() =>{
    // const newFileData = certificateData.filter((item) => item.id !== deleteFileId);
    //       setCertificateData(newFileData);

    fetch(deleteFileUrl, {
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
          const newFileData = certificateData.filter((item) => item.id !== deleteFileId);
                setCertificateData(newFileData);
        }
        // else {
        //   messageApi.error("Error deleting details!");
        // }

        setDeleteFileId(null);
      })
      .catch((err) => {
        // messageApi.error("Error deleting details!");
        console.log(err);
        setDeleteFileId(null);
      })
  }

  const dontDeleteFile = () => {
    setDeleteFileId(null)
  }

  const onDeleteFile = (id) => {
    setDeleteFileId(id)
  }

  const onDownload = () => {
    fetch(downloadFileUrl, {
      method: "GET",
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
          const newFileData = certificateData.filter((item) => item.id !== deleteFileId);
                setCertificateData(newFileData);
        }
        // else {
        //   messageApi.error("Error deleting details!");
        // }

        setDeleteFileId(null);
      })
      .catch((err) => {
        // messageApi.error("Error deleting details!");
        console.log(err);
        setDeleteFileId(null);
      })
  }

  return (
    <div className={styles.mainContainer} style={{ display: "block" }}>
      <form className={styles.formPersonalInfo} onSubmit={onSubmit}>
        <Heading className={styles.personalInfoHeading} text="Skills" />
        <table className={style.contentTable}>
          <th>S.no</th>
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
                    onCancel={dontDeleteField}
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
          className={`${styles.halfSize} ${style.levelField}`}
        />
        <Button type="submit" text="Add" className={styles.saveButton} />
      </form>

      {/* ----------------xxxxxxxxxxxxx-------------------- */}

      <form className={styles.formPersonalInfo} onSubmit={upload}>
        <Heading className={styles.personalInfoHeading} text="Certificates" optional="(Optional)" />{" "}
        <table className={style.contentTable} >
          
          <th>S.no</th>
          <th>Certificates</th>
          <th colSpan='2'>Action</th>
          {certificateData.map((element, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{element.certificate.name}</td>
                <td>
                  <Popconfirm
                    title="Delete File"
                    description="Are you sure to delete this file?"
                    onConfirm={deleteFile}
                    onCancel={dontDeleteFile}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      onClick={() => onDeleteFile(element.id)}
                      type="button"
                      text={<i className="fa fa-trash"></i>}
                    />
                  </Popconfirm>
                </td>
                <td style={{textAlign: "left", paddingLeft:0}}><Button
                onClick={() => onDownload(element.id)}
                type="button" 
                text={ <i className="fa-solid fa-cloud-arrow-down"></i> }
                />
                </td>
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
          className={`${styles.halfSize} ${style.certificateField}`}
        />
        <Button type="submit" text="Upload" className={styles.saveButton} />
      </form>
    </div>
  );
}
