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
  const [skillData, setSkillData] = useState([]);
  const [certificate, setCertificate] = useState("");
  const [certificateData, setCertificateData] = useState([]);
  const [category, setCategory] = useState("")
  const [deleteId, setDeleteId] = useState(null);

  // -------------xxxxxxxxxx-----------certificate-xxxxxxxxxxxx-----------
  const [deleteFileId, setDeleteFileId] = useState();
  const [id, setId] = useState(1);
  // const [userId, setUserId] = useState(sessionStorage.getItem("user_id"));
  const [userId, setUserId] = useState(1);
  // const [filename, setFileName] = useState(sessionStorage.getItem("filename"));
  const [filename, setFileName] = useState("myResume");

  const fileRef = useRef();

  // const basicRoute =
  //   "http://userprofileserviceapplication3-env.eba-pm56e7xe.us-east-1.elasticbeanstalk.com/api/users/skills";
  const basicRoute = 'http://192.168.0.185:5000/api/users/skills'
  const getSkillsbyUserId = `${basicRoute}/${userId}`;
  const postUrl = `${basicRoute}`
  const deleteUrl = `${basicRoute}/${deleteId}`


  //const fileRoute = 'http://userprofileserviceapplication3-env.eba-pm56e7xe.us-east-1.elasticbeanstalk.com/api/file'
  const fileRoute = 'http://192.168.0.185:5000/api/file'

  const fileUploadUrl = `${fileRoute}/upload`
  const getAllFilesUrl = `${fileRoute}/user/${userId}`
  const downloadFileUrl = `${fileRoute}/download`
  const deleteFileUrl = `${fileRoute}/delete/${deleteFileId}`

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
          setCertificateData(data);
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
  const handleCategory = useCallback((value) => {
    setCategory(value);
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
      setCertificate("");
      setCategory("")
      fileRef.current.value = null;  
      uploadFile(certificate, certificate.name, userId, category)

    }

  };

  const uploadFile = (cert, filename, userId, category) => {
    let formData = new FormData();

    formData.append('file', cert);
    formData.append('user_id', userId);
    formData.append('filename', filename);
    formData.append('category', category);

    fetch(fileUploadUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        // "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        // "Accept": '*/*',
      },
      body: formData,
    })
      .then(async response => {
        const data = await response.json();
        setCertificateData([...certificateData, data])
      })
      .catch(err => {
        console.log(err);
      });
  }

  const deleteFile = () => {
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

  const onDownload = (fileName) => {
    window.location.href = `${downloadFileUrl}/${fileName}`
  }

  return (
    <div className={styles.mainContainer} style={{ display: "block" }}>
      <form className={styles.formPersonalInfo} onSubmit={onSubmit}>
      {/* <Heading className={styles.personalInfoHeading} text="Add Skills" type="medium"/> */}
      <Heading className={styles.personalInfoHeading} text="Skills" />
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
          className={` ${style.levelField}`}
        />
        <Button type="submit" text="Add" className={styles.saveButton} />
        {/* <Heading className={styles.personalInfoHeading} text="Skills" /> */}
        <table className={styles.eduTable}>
          <th>S.no</th>
          <th>Skills</th>
          <th>Proficiency</th>
          <th>Action</th>
          {skillData.map((element, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{element["skill"]}</td>
                <td>{element["proficiency"]}</td>
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
                      className={style.deleteBtn}
                    />
                  </Popconfirm>
                </td>
              </tr>
            );
          })}
        </table>
      </form>

      {/* ----------------xxxxxxxxxxxxx-------------------- */}

      <form className={styles.formPersonalInfo} onSubmit={upload}>
      {/* <Heading className={`${styles.personalInfoHeading} ${style.certificatHeading}`} text="Add Certificates" type="medium" /> */}
              <Heading className={`${styles.personalInfoHeading} ${style.certificatHeading}`} text="Certificates" optional="(Optional)" />



        <InputField
          refling={fileRef}
          accept=".pdf, .odf"
          // value={certificate}
          handler={handleCertificate}
          type="file"
          placeholder=""
          className={`${styles.halfSize} ${style.certificateField}`}
        />
        <DropdownField
          value={category}
          handler={handleCategory}
          options={["Front-end", "Back-end","Other"]}
          placeholder="Category"
          className={` ${style.levelField}`}
        />
        <Button type="submit" text="Upload" className={styles.saveButton} />
        {/* <Heading className={styles.personalInfoHeading} text="Certificates" optional="(Optional)" /> */}
        <table className={styles.eduTable} >
          <th>S.no</th>
          <th>Certificates</th>
          <th>Category</th>
          <th colSpan='2'>Action</th>
          {certificateData.map((element, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{element.originalFileName}</td>
                <td>{element.category}</td>
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
                      className={style.deleteBtn}
                    />
                  </Popconfirm>
                </td>
                <td>
                  <Button
                    onClick={() => onDownload(element.bucketFileName)}
                    type="button"
                    text={<i className="fa-solid fa-cloud-arrow-down"></i>}
                    className={style.downloadBtn}
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </form>
    </div>
  );
}
