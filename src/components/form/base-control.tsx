
import type { FormikContextType } from 'formik'; // ✅ USE THIS
import type { JSX } from 'react';

// import type { FormikInterface } from '../utils/formik';

export interface BaseControlProps {
  formik?: FormikContextType<any>;
  required?: boolean;
  className?: string;
  label?: string;
  id?: string;
  children?: JSX.Element | JSX.Element[];
  touched?: boolean;
  error?: string;
  name?: string | any;
  append?: JSX.Element | JSX.Element[];
  prepend?: JSX.Element | JSX.Element[];
  after?: JSX.Element | JSX.Element[]|any|any[];
  labelClass?: string;
}

function BaseControl({ formik, required, labelClass, className, label, children, touched, error, name, prepend, append, after }: BaseControlProps) {

  if (formik) {
    /**
     * @type {import('formik').FieldMetaProps}
     */
    const meta = formik.getFieldMeta(name);

    if (meta) {
      touched = meta.touched;
      error = meta.error;
    }
  }

  return (
    <div className={`w-full  ${className || ""} `}>
       {label && <label
          className={`${labelClass} font-medium	  text-[#071437] `}
        >
          {label}{required ? <span className='!text-red-600'>*</span> : ""}
        </label>}

      
      
      <div className={`flex-nowrap`}>
        {prepend && <div className="input-group-prepend text-gray-500 text-xs">{prepend}</div>}
        {children} 
        {append && <div className="input-group-append text-gray-500 text-xs">{append}</div>}
      </div>

      {touched && error && typeof error == "string" && <span className="text-red-400 text-xs">{error}</span>}
      {after}
    
    
    </div>
  )
}

export default BaseControl

