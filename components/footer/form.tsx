import React from "react";
import styles from "../../styles/footer.module.scss";
const FormEmail = () => {
  return (
    <div className={styles.form}>
      <h3 className={styles["form-title"]}>Subscribe To Our Newsletter</h3>
      <form className={styles["form-content"]} action="#">
        <input
          type="email"
          className={styles["form-input"]}
          placeholder="Your email address"
        ></input>
        <button type="submit" className={styles["form-btn"]}>
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default FormEmail;
