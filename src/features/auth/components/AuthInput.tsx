import { AuthInputProps } from "../types";

const AuthInput = ({ type, name, label, value, onChange }: AuthInputProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0fa9ff] transition-colors"
        placeholder={label}
      />
    </div>
  );
};

export default AuthInput;
