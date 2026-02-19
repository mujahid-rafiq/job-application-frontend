import React from 'react';
import BaseControl, { type BaseControlProps } from './base-control';


export interface BaseFileInputProps extends BaseControlProps {
  accept?: string;
  onChange?: (file: File) => void;
  allowedSizeInByte?: number;
  required?: boolean;
  heading?:string;
  subHeading?:string;
  className2?:string;
  icon?:any
}

export default function BaseFileInput({
  label,
  name,
  required,
  accept,
  onChange,
  formik,
  touched,
  error,
  className,
  className2,
  allowedSizeInByte,
  heading,
  subHeading,
  icon
}: BaseFileInputProps) {
  let fieldError = error;
  let fieldTouched = touched;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (allowedSizeInByte && file.size > allowedSizeInByte) {
      alert(`File size exceeds the limit of ${allowedSizeInByte} bytes.`);
      e.target.value = '';
      return;
    }

    if (onChange) onChange(file);
    if (formik) {
      formik.setFieldValue(name, file);
    }
  };

  if (formik) {
    const meta = formik.getFieldMeta(name);
    if (meta) {
      fieldTouched = meta.touched;
      fieldError = meta.error;
    }
  }

  return (
    <BaseControl
      name={name}
      label={label}
      required={required}
      className={className}
      formik={formik}
      touched={fieldTouched}
      error={fieldError}
    >
      <label className={`${className}`}>
      {/* flex  items-center text-center */}
        <div className={`${className2}`}> 
        <span>{icon}</span>
          <span className="text-[#1E1E1E] text-[14px] mt-2 ">{heading}</span>
          <p className="text-[#78829D] text-[12px]">{subHeading}</p>
        </div>
        <input
          type="file"
          name={name}
          accept={accept}
          required={required}
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </BaseControl>
  );
}
