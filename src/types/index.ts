// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

// API response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Form related types
export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number";
  required?: boolean;
  validation?: {
    pattern?: RegExp;
    message?: string;
  };
}

// Theme types
export type Theme = "light" | "dark";

// Common props types
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

// API error types
export interface ApiError {
  message: string;
  code: string;
  status: number;
}
