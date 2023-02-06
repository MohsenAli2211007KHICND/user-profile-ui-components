import styles from "../CandidatePersonalInfo/CandidatePersonalInfo.module.css";

function InputField({
  type,
  placeholder,
  className,
  required,
  icon,
  value,
  handler,
  disabled,
  pattern,
  accept,
  min,
  refling
}) {
  const handleChange = (e) => {
    let value;
    if (type === "file") {
      value = e.target.files[0];
      // value = e
    } else {
      value = e.target.validity.valid
        ? e.target.value
        : e.target.value.substr(0, e.target.value.length - 1);
    }
    handler(value);
  };

  return (
    <>
      <input
        ref={refling}
        min={min}
        accept = {accept}
        pattern={pattern}
        disabled={disabled}
        value={value}
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        className={`${className} ${styles.inputFields}`}
        required={required}
      />
    </>
  );
}

export default InputField;
