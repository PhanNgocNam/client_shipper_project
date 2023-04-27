import React from "react";
import styles from "./rejectButton.module.scss";

function RejectButton({ content, onClick }) {
  return (
    <button onClick={onClick} className={styles.rejectBtn}>
      {content}
    </button>
  );
}

export default RejectButton;
