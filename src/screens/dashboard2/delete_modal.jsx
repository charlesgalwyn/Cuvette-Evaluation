import React from "react";
import styles from "../dashboard/dashboard.module.css";

const DeleteModalNew = ({
  handleCancel,
  handleDelete,
}) => {
  return (
    <div className={styles.modalOverlay} onClick={handleCancel}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalContent}>
                <p
                  style={{
                    fontSize: "1.7rem",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Are you sure you want to delete?
                </p>
                <div className={styles.buttonContainer}>
                  <button
                    onClick={handleDelete}
                    className={styles.confirmDeleteModalButton}
                  >
                    Confirm Delete
                  </button>
                  <button
                    onClick={handleCancel}
                    className={styles.cancelModalButton}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
  )
}

export default DeleteModalNew