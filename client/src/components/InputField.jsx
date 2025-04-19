import React from 'react';

const InputField = ({ label, type, value, onChange, name, placeholder }) => {
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-sm text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full p-3 border rounded dark:bg-zinc-700 dark:text-white dark:border-zinc-600 mt-2"
        />
      </div>
    );
  };
  
  export default InputField;
  