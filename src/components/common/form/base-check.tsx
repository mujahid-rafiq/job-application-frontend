import React from "react";
import type { BaseControlProps } from "./base-control";

export interface BaseCheckProps extends BaseControlProps {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  disabled?: boolean;
  checkBoxParentClass?: string;
}

export default function BaseCheck({
  formik,
  checkBoxParentClass = "",
  required,
  className,
  label,
  checked,
  onChange,
  handleBlur,
  readOnly,
  name,
  touched,
  error,
  disabled,
}: BaseCheckProps) {
  if (formik) {
    const meta = formik.getFieldMeta(name);
    if (meta) {
      checked = meta.value === true;
      touched = meta.touched;
      error = meta.error;
    }
    onChange = onChange || formik.handleChange;
    handleBlur = handleBlur || formik.handleBlur;
  }

  const onChangeProxy = (e: any) => {
    const { checked } = e.target;
    if (onChange) {
      onChange({
        ...e,
        target: {
          ...e.target,
          name: name,
          value: checked,
        },
      });
    }
  };

  const isToggle = checkBoxParentClass.includes("toggle-switch");
  const toggleClassName = checkBoxParentClass.includes("toggle-switch")
    ? checkBoxParentClass.trim()
    : `toggle-switch ${checkBoxParentClass}`.trim();

  return (
    <div className={`${className} `}>
      {isToggle ? (
        <div className="flex items-center gap-2">
          <label className={toggleClassName}>
            <input
              disabled={disabled}
              id={name}
              type="checkbox"
              checked={checked}
              onChange={onChangeProxy}
              onBlur={handleBlur}
              readOnly={readOnly}
              name={name}
              role="switch"
            />
            <span className="toggle-slider"></span>
          </label>
          <div className="relative w-full ml-2 whitespace-nowrap overflow-hidden text-ellipsis">
            {label}
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <input
            disabled={disabled}
            id={name}
            type="checkbox"
            checked={checked}
            onChange={onChangeProxy}
            onBlur={handleBlur}
            readOnly={readOnly}
            name={name}
            role="switch"
            className={`checkbox ${error ? "is-invalid" : ""}`}
          />
          {label && (
            <label
              htmlFor={name}
              style={{ fontWeight: 300 }}
              className="text-[16px] text-[#071437] leading-[20px] flex items-center"
            >
              <span className="whitespace-nowrap">{label}</span>
              {required && <span className="text-danger ml-1">*</span>}
            </label>
          )}
        </div>
      )}
      {touched && error && typeof error === "string" && (
        <span className="text-danger small">{error}</span>
      )}
    </div>
  );
}
