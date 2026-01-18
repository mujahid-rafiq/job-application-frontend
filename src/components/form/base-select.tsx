import React from 'react'
import type { BaseControlProps } from './base-control';
import BaseControl from './base-control';
// import BaseControl, { type BaseControlProps } from '../base-control';

export interface BaseSelectProps extends BaseControlProps {
  enumType?: object;
  hideOptions?: string[];
  showOptions?: string[];
  options?: { value?: string, label?: string }[] | any[] ;
  valueKey?: string;
  labelKey?: string;
  labelPrefix?: string;
  createLabel?: (e?: any) => string;
  placeholder?: string | boolean;
  value?: any;
  name?:any;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  readOnly?: boolean;
  fieldClass?: string;
  
}

function BaseSelect({ append, prepend, formik, required, className, enumType, options,fieldClass, valueKey = "value", labelKey = "label", labelPrefix, createLabel, label, placeholder, value, onChange, handleBlur, readOnly, name, touched, error, hideOptions, showOptions }: BaseSelectProps) {

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
    onChange = onChange || formik.handleChange
    handleBlur = handleBlur || formik.handleBlur;
  }

  if (typeof enumType == "object") {
    options = Object.entries(enumType)?.map(([key, value]) => (
      console.log(key),
      {
      [valueKey]: value,
      [labelKey]: value
    }
  ))

    if (hideOptions?.length) options = options?.filter((v:any) => !hideOptions.includes(v.value))
    if (showOptions?.length) options = options?.filter((v:any) => showOptions.includes(v.value))

  }
  else if (options && options.length > 0 && typeof options[0] != "object") {
    options = options?.map((v:any) => ({
      [valueKey]: v,
      [labelKey]: v
    }));
  }
  else if (createLabel) {
    options = options?.map((v:any) => ({
      [valueKey]: v[valueKey],
      [labelKey]: createLabel(v)
    }));
  }

  /**
   * 
   * @param {React.ChangeEvent<HTMLSelectElement>} e 
   */
  function onChangeProxy(e?:any) {
    const { name, value } = e.target;

    if (!onChange) return;

    if (!value) {
      onChange({
        ...e,
        target: {
          ...e.target,
          name: name,
          value: null
        }
      });
    } else onChange(e);

  }

  return (
    <BaseControl
    className={`relative p-1 w-full ${className} my-1 `}
    name={name}
      label={label}
      required={required}
      formik={formik}
      touched={touched}
      error={error}
      prepend={prepend}
      append={append}
    >
      <select
        value={value == null ? "" : value}
        onChange={onChangeProxy}
        onBlur={handleBlur}
        disabled={readOnly}
        name={name?.toString()}
        id={name?.toString()}
        className={`${fieldClass}  bg-white border ${error ? "is-invalid  border-red-300 " : " border-[#CBDEFF] "} w-full mt-0 outline-none focus:outline-1  focus:border-[#9dc0fe]   bg-white   px-[16px] py-[14px]  text-[14px] font-light text-[#071437]	rounded-[8px]`}
      >
        {placeholder && <option value="" >{placeholder === true ? `${label || name}` : placeholder.toString()}</option>}

        {options && options?.map((v : any, i : any) => (<option key={i} value={v[valueKey]}>{(labelPrefix ? `${labelPrefix}.${v[labelKey]}` : v[labelKey])}</option>))}
      </select>
    </BaseControl>
  )
}

export default BaseSelect

