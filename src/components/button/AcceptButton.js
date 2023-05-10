import React from "react";
import styles from "./acceptButton.module.scss";

function AcceptButton({ content, onClick, dateWasSelected }) {
  return (
    <button onClick={onClick} className={styles.acceptBtn}>
      {content}
    </button>
  );
}

export default AcceptButton;
