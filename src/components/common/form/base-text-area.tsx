import React from "react";
import BaseControl, { type BaseControlProps } from "./base-control";

export interface BaseTextAreaProps extends BaseControlProps {
  maxLength?: number;
  rows?: number;
  placeholder?: string | boolean;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  disabled?: boolean;
  fieldClass?: string;
  noBorder?: boolean;
}

function BaseTextArea({
  formik,
  required,
  fieldClass,
  className,
  maxLength,
  label,
  rows,
  placeholder,
  value,
  onChange,
  handleBlur,
  readOnly,
  disabled,
  name,
  touched,
  error,
  append,
  prepend,
  noBorder,
  labelClass,
}: BaseTextAreaProps) {
  if (formik) {
    /**
     * @type {import('formik').FieldMetaProps}
     */
    const meta = formik.getFieldMeta(name);

    if (meta) {
      value = meta.value;
      touched = meta.touched;
      error = meta.error;
    }
    onChange = onChange || formik.handleChange;
    handleBlur = handleBlur || formik.handleBlur;
  }

  return (
    <BaseControl
      className={`relative p-1 w-full ${className || ""} my-1`}
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
      <textarea
        placeholder={
          placeholder === true ? label || name : (placeholder || "").toString()
        }
        value={value || ""}
        rows={rows}
        maxLength={maxLength}
        onChange={onChange}
        onBlur={handleBlur}
        readOnly={readOnly}
        disabled={disabled}
        name={name}
        id={name}
        className={`${fieldClass || ""} ${
          disabled ? "bg-gray-300 text-gray-600" : ""
        } ${
          noBorder
            ? ""
            : `border ${
                touched && error
                  ? "is-invalid shadow-red-200 border-red-300"
                  : "border-[#CBDEFF]"
              }`
        } mt-1 block w-full resize-none rounded-xl bg-white px-[24px] py-[12px] font-sora text-base text-[#475569] outline-none focus:outline-1 focus:border-[#9dc0fe]`}
      />
    </BaseControl>
  );
}

export default BaseTextArea;
