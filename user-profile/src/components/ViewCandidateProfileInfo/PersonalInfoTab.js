import React from 'react'
import Button from '../Button/Button'
import styles from '../CandidatePersonalInfo/CandidatePersonalInfo.module.css'

export default function PersonalInfoTab() {
  return (
    <div>
      <Button
              onClick={''}
              text="Personal Info"
              type="button"
              className={styles.saveButton}
            />   
                  <Button
              onClick={''}
              text="Academic"
              type="button"
              className={styles.saveButton}
            />
                  <Button
              onClick={""}
              disabled={""}
              text="Experience"
              type="button"
              className={styles.saveButton}
            />      <Button
            onClick={''}
            text="Skills"
            type="button"
            className={styles.saveButton}
          />
 <Button
            onClick={''}
            text="Certificates"
            type="button"
            className={styles.saveButton}
          />
            
             </div>
  )
}
