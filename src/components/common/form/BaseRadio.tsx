import React from 'react';
import type { BaseControlProps } from './base-control';



export interface BaseRadioProps extends BaseControlProps {
    value: string;
    selectedValue?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    disabled?: boolean;
    radioParentClass?: string;
  }
  

export default function BaseRadio({
  formik,
  radioParentClass,
  required,
  className,
  label,
  value,
  selectedValue,
  onChange,
  handleBlur,
  readOnly,
  name,
  touched,
  error,
  disabled
}: BaseRadioProps) {

  if (formik) {
    const meta = formik.getFieldMeta(name);

    if (meta) {
      selectedValue = meta.value as string | number;
      touched = meta.touched;
      error = meta.error;
    }

    onChange = onChange || formik.handleChange;
    handleBlur = handleBlur || formik.handleBlur;
  }

  const isChecked = selectedValue === value;

  const onChangeProxy = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange({
        ...e,
        target: {
          ...e.target,
          name: name,
          value: value
        }
      });
    }
  };

  return (
    <div className={className}>
      <div className={`radio-parent flex gap-2 items-center px-[4px] py-2 ${radioParentClass}`}>
        <input
          disabled={disabled}
          id={`${name}-${value}`}
          type="radio"
          value={value}
          checked={isChecked}
          onChange={onChangeProxy}
          onBlur={handleBlur}
          readOnly={readOnly}
          name={name}
           className={`radio ${error ? "is-invalid" : ""} accent-[#0A5185]`}
        />
        {label && (
          <label htmlFor={`${name}-${value}`} className="text-[14px] font-400">
            {label} {required && <span className='text-danger'>*</span>}
          </label>
        )}
      </div>
      {touched && error && typeof error === "string" && (
        <span className="text-danger small">{error}</span>
      )}
    </div>
  );
}
