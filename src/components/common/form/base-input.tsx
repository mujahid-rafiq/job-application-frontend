import React from "react";
import BaseControl, { type BaseControlProps } from "./base-control";

export interface BaseInputProps extends BaseControlProps {
  accept?: string;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  type?: string;
  min?: string | number;
  max?: string | number;
  step?: number;
  placeholder?: string | boolean;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  fieldClass?: string;
  labelClass?: string;
  disabled?: boolean;
  fieldInfo?: string;
  icon?: any;
  unit?: string; // <-- NEW
  unitColor?: boolean;
  noBorder?: boolean; // <-- NEW
  inputAppend?: React.ReactNode;
  inputAppendClass?: string;
  inputPrepend?: React.ReactNode;
  inputPrependClass?: string;
}

function BaseInput({
  formik,
  accept,
  required,
  fieldInfo,
  icon,
  className,
  disabled,
  fieldClass,
  labelClass,
  label,
  handleBlur,
  type,
  min,
  max,
  step,
  placeholder,
  value,
  onChange,
  onKeyDown,
  readOnly,
  name,
  touched,
  error,
  append,
  prepend,
  unit, // <-- NEW
  unitColor,
  noBorder,
  inputAppend,
  inputAppendClass,
  inputPrepend,
  inputPrependClass,
}: BaseInputProps) {
  if (formik) {
    const meta = formik.getFieldMeta(name);
    if (meta) {
      value = meta.value;
      touched = meta.touched;
      error = meta.error;
    }
    onChange = onChange || formik.handleChange;
    handleBlur = handleBlur || formik.handleBlur;
  }

  if (type === "date" && typeof value === "string" && value?.includes("T")) {
    value = value.split("T")[0];
  }

  if (type === "int" || type === "integer") {
    type = "number";
    step = 1;
    onKeyDown =
      onKeyDown ||
      function (e) {
        if (min != null && +min >= 0 && e.key === "-") e.preventDefault();
        if (e.key === ".") e.preventDefault();
      };
  } else if (type === "number") {
    onKeyDown =
      onKeyDown ||
      function (e) {
        if (min != null && +min >= 0 && e.key === "-") e.preventDefault();
        if (["e", "E", "+"].includes(e.key)) e.preventDefault();
      };
  }

  if (type === "number") {
    const currentOnChange = onChange;
    onChange = (e) => {
      const { value } = e.target;
      if (value && value.startsWith(".")) {
        e.target.value = `0${value}`;
      }
      currentOnChange?.(e);
    };
  }

  // Special handling for file inputs to show filename inside the input
  if (type === "file") {
    // If fieldClass is "hidden", use the original behavior (don't show custom file input)
    if (fieldClass === "hidden") {
      return (
        <BaseControl
          className={`relative p-1 w-full ${className} my-1`}
          name={name}
          label={label}
          required={required}
          formik={formik}
          touched={touched}
          error={error}
          prepend={prepend}
          append={append}
          labelClass={labelClass}
        >
          <div className="relative">
            <input
              accept={accept}
              onBlur={handleBlur}
              type="file"
              onChange={onChange}
              disabled={disabled}
              name={name}
              id={name}
              className={`${fieldClass} ${disabled && "bg-gray-300 text-gray-600"
                } ${noBorder
                  ? ""
                  : `border ${touched && error
                    ? "is-invalid shadow-red-200 border-red-300"
                    : "border-[#CBDEFF]"
                  }`
                } w-full mt-0 outline-none focus:outline-1 focus:border-[#9dc0fe] bg-white px-[14px] py-[12px] text-[14px] font-light text-[#071437] rounded-[8px]`}
            />
          </div>
          <span className="text-xs text-gray-400 text-right">{fieldInfo}</span>
        </BaseControl>
      );
    }

    // Handle both File objects and existing image URLs
    let displayValue = "";
    if (value) {
      if (value instanceof File) {
        // New file selected
        displayValue = value.name;
      } else if (typeof value === "string" && value.trim() !== "") {
        // Existing image URL from API
        const fileName = value.split("/").pop() || value; // Extract filename from URL
        displayValue = fileName;
      }
    }

    return (
      <BaseControl
        className={`relative p-1 w-full ${className} my-1`}
        name={name}
        label={label}
        required={required}
        formik={formik}
        touched={touched}
        error={error}
        prepend={prepend}
        append={append}
        labelClass={labelClass}
      >
        <div className="relative">
          {/* Hidden file input */}
          <input
            accept={accept}
            onBlur={handleBlur}
            type="file"
            onChange={onChange}
            disabled={disabled}
            name={name}
            id={name}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />

          {/* Custom display input that shows filename */}
          <div className="flex w-full">
            <input
              type="text"
              readOnly
              disabled={disabled}
              placeholder={
                placeholder === true
                  ? label || name
                  : (placeholder || "Choose file").toString()
              }
              value={displayValue}
              className={`${fieldClass} ${disabled && "bg-gray-300 text-gray-600"
                } ${noBorder
                  ? ""
                  : `border ${touched && error
                    ? "is-invalid shadow-red-200 border-red-300"
                    : "border-[#CBDEFF]"
                  }`
                } flex-1 mt-0 outline-none focus:outline-1 focus:border-[#9dc0fe] bg-white px-[14px] py-[12px] text-[14px] font-light text-[#071437] rounded-l-[8px] rounded-r-none cursor-pointer`}
            />

            {/* Choose file button */}
            <button
              type="button"
              disabled={disabled}
              className={`px-4 py-[12px] bg-[#3E7EFF] text-white text-sm font-medium rounded-r-[8px] border border-[#3E7EFF] hover:bg-[#2E6BFF] disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0`}
            >
              Choose File
            </button>
          </div>

          {unit && (
            <div
              className={`absolute inset-y-0 right-3 flex items-center ${unitColor ? "text-[#78829D]" : "text-[#3E7EFF]"
                }  text-[14px]`}
            >
              {unit}
            </div>
          )}
        </div>

        {icon && (
          <div
            className={`absolute ${label ? "top-10" : "top-5"
              } left-4 flex items-center  `}
          >
            {icon}
          </div>
        )}

        <span className="text-xs text-gray-400 text-right">{fieldInfo}</span>
      </BaseControl>
    );
  }

  return (
    <BaseControl
      className={`relative p-1 w-full ${className} my-1`}
      name={name}
      label={label}
      required={required}
      formik={formik}
      touched={touched}
      error={error}
      prepend={prepend}
      append={append}
      labelClass={labelClass}
    >
      <div className="relative">
        <input
          accept={type === "file" ? accept : undefined}
          onBlur={handleBlur}
          type={type || "text"}
          min={min}
          max={max}
          step={step}
          placeholder={
            placeholder === true
              ? label || name
              : (placeholder || "").toString()
          }
          value={value == null ? "" : value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          readOnly={readOnly}
          disabled={disabled}
          name={name}
          id={name}
          className={`${fieldClass} ${disabled && "bg-gray-300 text-gray-600"
            } ${noBorder
              ? ""
              : `border ${touched && error
                ? "is-invalid shadow-red-200 border-red-300"
                : "border-[#CBDEFF]"
              }`
            } w-full mt-0 outline-none focus:ring-2 focus:ring-blue-50 focus:border-blue-400 bg-white ${inputPrepend ? 'pl-11' : 'pl-4'} ${inputAppend ? 'pr-11' : 'pr-4'} py-4 text-[15px] font-medium text-[#071437] rounded-xl transition-all shadow-sm`}
        />

        {unit && (
          <div
            className={`absolute inset-y-0 right-3 flex items-center ${unitColor ? "text-[#78829D]" : "text-[#3E7EFF]"
              }  text-[14px]`}
          >
            {unit}
          </div>
        )}
        {inputPrepend && (
          <div
            className={`absolute inset-y-0 left-3 flex items-center ${inputPrependClass || ""
              }`}
          >
            {inputPrepend}
          </div>
        )}
        {inputAppend && (
          <div
            className={`absolute inset-y-0 right-3 flex items-center ${inputAppendClass || ""
              }`}
          >
            {inputAppend}
          </div>
        )}
      </div>

      {icon && (
        <div
          className={`absolute ${label ? "top-10" : "top-5"
            } left-4 flex items-center  `}
        >
          {icon}
        </div>
      )}

      <span className="text-xs text-gray-400 text-right">{fieldInfo}</span>
    </BaseControl>
  );
}

export default BaseInput;
