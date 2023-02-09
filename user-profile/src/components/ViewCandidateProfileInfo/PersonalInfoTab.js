import React, { useEffect, useState } from 'react'
import Button from '../Button/Button'
import styles from '../CandidateAcademicInfo/CandidateAcademicInfo.module.css'
import Heading from '../Heading/Heading'

export default function PersonalInfoTab() {
    const [personalData, setPersonalData] = useState('')

    useEffect(() => {
          const personalInfo = () => {
        fetch('http://35.168.113.87:8080/api/personal-information')
          .then(async (response) => {
            const data = await response.json();
            console.log(data)
            setPersonalData(data);
          })
          .catch((err) => {
            console.log("Hello! I caught this error.");
          });
      } 
      personalInfo();
    },[])
 
    return (
        <div>
            <Button onClick={''} text="Personal Info" type="button" className={''} />
            <Button onClick={''} text="Academic" type="button" className={''} />
            <Button onClick={""} text="Experience" type="button" className={''} />
            <Button onClick={''} text="Skills" type="button" className={''} />
            <Button onClick={''} text="Certificates" type="button" className={''} />
            <Heading text={"Personal Information"} className={styles.personalInfoHeading} />
            <Heading text={"Basic Info"} className={styles.personalInfoHeading} type='medium' />

            {/* *************************************Table******************************************* */}

            <table className={styles.eduTable} style={{width: "60%", }}>
                <tr>
                    <td>FullName:</td>
                    <td>{`${personalData[0].firstName} ${personalData[0].lastName}`}</td>
                    <td>Merital Status:</td>
                    <td>{"Marital status Value"}</td>
                </tr>
                <tr>
                    <td>Gender:</td>
                    <td>{"Gender Value"}</td>
                    <td>Phone Number:</td>
                    <td>{"Phone Value"}</td>
                </tr>
                <tr>
                <td>Date Of Birth:</td>
                    <td>{"DOB Value"}</td>
                    <td>CNIC/ID:</td>
                    <td>{"Phone Value"}</td>
                </tr>
                <tr>
                    <td>LinkedIn Profile:</td>
                    <td colSpan='3'>{"LinkedIn value"}</td>
                </tr>
            </table>
        </div>

    )
}
