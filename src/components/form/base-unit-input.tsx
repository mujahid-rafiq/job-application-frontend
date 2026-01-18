import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import BaseControl, { type BaseControlProps } from "./base-control";

export interface BaseUnitInputProps extends BaseControlProps {
  type?: string;
  min?: string | number;
  max?: string | number;
  step?: number;
  placeholder?: string | boolean;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  unitReadOnly?: boolean; // New prop to control unit dropdown readonly state
  fieldClass?: string;
  labelClass?: string;
  disabled?: boolean;
  fieldInfo?: string;
  icon?: any;
  units?: string[];
  unitFieldName?: string;
  noBorder?: boolean;
  prefix?: string;
}

const BaseUnitInput = ({
  formik,
  required,
  fieldInfo,
  icon,
  className,
  disabled,
  fieldClass,
  labelClass,
  label,
  type,
  min,
  max,
  step,
  placeholder,
  value,
  onChange,
  onKeyDown,
  readOnly,
  unitReadOnly = false, // Default to false (editable)
  name,
  touched,
  error,
  append,
  prepend,
  units,
  unitFieldName,
  noBorder,
  prefix,
}: BaseUnitInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Formik integration
  if (formik) {
    const meta = formik.getFieldMeta(name);
    if (meta) {
      value = meta.value;
      touched = meta.touched;
      error = meta.error;
    }
    onChange = onChange || formik.handleChange;
  }

  const formatUnitLabel = (unitValue?: string | null) => {
    if (!unitValue) return "";
    return unitValue
      .toString()
      .split(/[\s_-]+/)
      .map(
        (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
      )
      .join(" ");
  };

  // Get the current unit from the separate unit field
  const getCurrentUnit = () => {
    if (formik && unitFieldName) {
      const unitValue = formik.getFieldMeta(unitFieldName)?.value;
      if (!unitValue && units) {
        if (units.includes('cm')) {
          return 'cm';
        } else if (units.includes('lbs')) {
          return 'lbs';
        }
        return units[0];
      }
      return unitValue;
    }
    if (units) {
      if (units.includes('cm')) {
        return 'cm';
      } else if (units.includes('lbs')) {
        return 'lbs';
      }
      return units[0];
    }
    return 'kg';
  };

  const numericValue = value || "";
  const selectedUnit = getCurrentUnit();
  const hasPrefix = Boolean(prefix);

  // Check if unit dropdown should be disabled (either disabled or unitReadOnly)
  const isUnitDisabled = disabled || unitReadOnly;

  // Initialize unit field with default value if it's undefined
  useEffect(() => {
    if (formik && unitFieldName && units) {
      const currentUnitValue = formik.getFieldMeta(unitFieldName)?.value;
      if (!currentUnitValue && units.length > 0) {
        let defaultUnit = units[0];
        if (units.includes('cm')) {
          defaultUnit = 'cm';
        } else if (units.includes('lbs')) {
          defaultUnit = 'lbs';
        }
        formik.setFieldValue(unitFieldName, defaultUnit);
      }
    }
  }, [formik, unitFieldName, units]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    if (formik) {
      formik.setFieldValue(name, inputValue);
    } else if (onChange) {
      onChange(e);
    }
  };

  // Handle unit change
  const handleUnitChange = (newUnit: string) => {
    if (formik && unitFieldName) {
      formik.setFieldValue(unitFieldName, newUnit);
    }
    setIsOpen(false);
  };

  // Handle number input validation
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
        <div className="flex items-center">
          {hasPrefix && (
            <div
              className={`px-4 py-[12px] text-[14px] font-medium text-[#071437] bg-gray-50 ${
                disabled ? "bg-gray-200 text-gray-500" : ""
              } ${
                noBorder
                  ? ""
                  : `border ${
                      error ? "border-red-300" : "border-[#CBDEFF]"
                    }`
              } ${hasPrefix ? "rounded-l-[8px]" : ""}`}
            >
              {prefix}
            </div>
          )}
          <input
            type={type || "text"}
            min={min}
            max={max}
            step={step}
            placeholder={
              placeholder === true
                ? label || name
                : (placeholder || "").toString()
            }
            value={numericValue}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
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
                    error
                      ? "is-invalid shadow-red-200 border-red-300"
                      : hasPrefix
                        ? "border-[#CBDEFF] border-l-0"
                        : "border-[#CBDEFF]"
                  }`
            } w-full mt-0 outline-none focus:outline-1 focus:border-[#9dc0fe] bg-white px-[14px] py-[12px] text-[14px] font-light text-[#071437] ${
              hasPrefix ? "rounded-none" : "rounded-l-[8px]"
            } rounded-r-none`}
          />
          
          <div className="relative">
            <button
              type="button"
              onClick={() => !isUnitDisabled && setIsOpen(!isOpen)}
              disabled={isUnitDisabled}
              className={`flex items-center gap-2 px-4 py-3 bg-gray-50 transition-colors border-l border-gray-300 ${
                isUnitDisabled 
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed" 
                  : "hover:bg-gray-100 cursor-pointer"
              } ${noBorder ? "" : "border"} ${
                error ? "border-red-300" : "border-[#CBDEFF]"
              } rounded-r-[8px] rounded-l-none`}
            >
              <span className={`font-medium text-[14px] ${
                isUnitDisabled ? "text-gray-600" : "text-[#3E7EFF]"
              }`}>
                {formatUnitLabel(selectedUnit as string)}
              </span>
              {!isUnitDisabled && (
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              )}
            </button>
            
            {isOpen && !isUnitDisabled && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-20 min-w-[120px]">
                  {units?.map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnitChange(unit);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-indigo-50 transition-colors text-gray-700 font-medium first:rounded-t-lg last:rounded-b-lg"
                    >
                      {formatUnitLabel(unit)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {icon && (
          <div
            className={`absolute ${
              label ? "top-10" : "top-5"
            } left-4 flex items-center`}
          >
            {icon}
          </div>
        )}

        <span className="text-xs text-gray-400 text-right">{fieldInfo}</span>
      </div>
    </BaseControl>
  );
};

export default BaseUnitInput;