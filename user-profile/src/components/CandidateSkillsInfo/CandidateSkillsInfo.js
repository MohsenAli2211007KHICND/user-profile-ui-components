import React from "react";
import Heading from "../Heading/Heading";
import styles from "../CandidateAcademicInfo/CandidateAcademicInfo.module.css";
import Slider from '@material-ui/core/Slider'
import InputField from "../InputField/InputField";

export default function CandidateSkillsInfo() {
    // function valuetext(value) {
    //     return `${value}°C`;
    //   }
  return (
    <div className={styles.mainContainer} style={{ display: "block" }}>
      <form className={styles.formPersonalInfo}>
        <Heading className={styles.personalInfoHeading} text="Skills" />{" "}
        {/* //personalInfoHeading is name of css class */}
        <InputField
          value={""}
          handler={""}
          type="text"
          placeholder="Skills"
          className={styles.halfSize}
          required="required"
        />
        <input  type='range' min='1' max='10' step='1' />
        {/* <div>
          <Slider
            aria-label="Temperature"
            defaultValue={30}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={10}
            marks
            min={10}
            max={110}
          />
          <Slider
            defaultValue={30}
            step={10}
            marks
            min={10}
            max={110}
            disabled
          />
        </div> */}
      </form>
    </div>
  );
}
