import { ReactNode } from "react";

export interface AuthFormProps {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
  error?: string;
  submitText: string;
  onGoogleClick?: () => void;
}

export interface AuthInputProps {
  type: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface UseAuthReturn {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  error: string | null;
  loading: boolean;
}
