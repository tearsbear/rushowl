// src/components/InputForm.tsx
import React, { ChangeEvent } from "react";

interface InputFormProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<InputFormProps> = ({
  label,
  type,
  id,
  value,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-700 mb-3">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="w-full px-4 custom-input-form font-poppins-regular focus:outline-none focus:ring focus:ring-yellow-200 mb-3"
        placeholder={`type your ${type} here`}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default InputForm;
