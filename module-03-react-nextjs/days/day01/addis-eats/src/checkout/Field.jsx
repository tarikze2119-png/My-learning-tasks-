import React from "react";

export function Field({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  placeholder = "",
  options = null,
  isTextarea = false,
  helpText = null,
}) {
  const showError = Boolean(touched && error);
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;

  return (
    <div className={`form-group ${showError ? "has-error" : ""}`}>
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="req-asterisk" aria-hidden="true">*</span>}
      </label>

      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          className="form-control"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={showError}
          aria-describedby={
            showError ? errorId : helpText ? helpId : undefined
          }
          rows={3}
        />
      ) : options ? (
        <select
          id={id}
          name={name}
          className="form-control"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={showError}
          aria-describedby={
            showError ? errorId : helpText ? helpId : undefined
          }
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          className="form-control"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={showError}
          aria-describedby={
            showError ? errorId : helpText ? helpId : undefined
          }
          required={required}
        />
      )}

      {helpText && !showError && (
        <small id={helpId} className="form-help-text">
          {helpText}
        </small>
      )}

      {showError && (
        <p id={errorId} role="alert" className="field-error-text">
          <span className="error-icon" aria-hidden="true">⚠️</span> {error}
        </p>
      )}
    </div>
  );
}

export default Field;
