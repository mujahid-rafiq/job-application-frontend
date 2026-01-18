import React from "react";

interface FileUploadProps {
  label?: string;
  name?: string;
  accept?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFiles?: FileList | null;
  formik?: any;
  required?: boolean;
  error?: string;
  touched?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  label, 
  name, 
  accept, 
  onChange, 
  formik,
  required = false,
  error,
  touched
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && formik) {
      formik.setFieldValue(name, file);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="w-full space-y-1">
      <label htmlFor={name} className="text-[16px] text-[#071437]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex w-full border border-[#CBDEFF] rounded-lg overflow-hidden h-[48px] items-center">
        <label
          htmlFor={name}
          className="bg-[#CBDEFF] text-[#1E1E1E] text-[16px] px-4 py-3 cursor-pointer whitespace-nowrap"
        >
          Upload File
        </label>
        <input
          id={name}
          name={name}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="flex-1 text-sm text-gray-600 file:hidden px-2 py-2 focus:outline-none"
        />
      </div>
      {touched && error && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}
      {name && formik?.values?.[name] && formik?.values?.[name]?.name && (
        <div className="text-green-600 text-sm mt-1">
          ✓ {formik.values[name].name} selected
        </div>
      )}
    </div>
  );
};

export default FileUpload;
