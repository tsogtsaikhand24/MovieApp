export const Input = ({
  label,
  value,
  error,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm" htmlFor={label}>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        className={`
          w-[416px] h-[44px] rounded-[8px] border-blue-200 px-3 placeholder:text-gray-400 placeholder:text-sm
          ${error ? "border-red-500" : "border-blue-200"} 
        `}
        id={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
