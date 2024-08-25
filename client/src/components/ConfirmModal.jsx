import React from "react";
import "./ConfirmModal.css"; // Style for your modal

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn-yes" onClick={onConfirm}>
            Yes
          </button>
          <button className="btn-no" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
