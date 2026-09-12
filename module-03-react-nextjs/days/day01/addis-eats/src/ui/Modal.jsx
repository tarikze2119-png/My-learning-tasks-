import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * Modal Component using React Portals
 * Renders into #modal-root to escape parent overflow/stacking issues,
 * while maintaining React context, event bubbling, Escape key closing, and focus restoration.
 */
export function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement;
      // Focus modal container on mount
      modalRef.current?.focus();

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      // Prevent body scrolling while modal is open
      document.body.style.overflow = "hidden";

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "unset";
        previouslyFocusedElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal-root") || document.body;

  return createPortal(
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-panel"
        ref={modalRef}
        tabIndex={-1}
      >
        <div className="modal-header">
          {title && <h3 id="modal-title" className="modal-title">{title}</h3>}
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
