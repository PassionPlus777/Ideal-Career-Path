import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import AuthInput from "../components/AuthInput";
import { useAuth } from "../hooks/useAuth";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, error, loading } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(email, password, name);
    if (!error) {
      navigate("/");
    }
  };

  const handleGoogleSignup = async () => {
    await signInWithGoogle();
    if (!error) {
      navigate("/");
    }
  };

  return (
    <AuthForm
      title="Create your account"
      onSubmit={handleSignup}
      error={error || undefined}
      submitText={loading ? "Creating account..." : "Sign up"}
      onGoogleClick={handleGoogleSignup}
    >
      <AuthInput
        type="text"
        name="name"
        label="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <AuthInput
        type="email"
        name="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <AuthInput
        type="password"
        name="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex items-center justify-end">
        <div className="text-sm">
          <a
            href="/login"
            className="font-medium text-[#0fa9ff] hover:text-[#0288d1]"
          >
            Already have an account? Sign in
          </a>
        </div>
      </div>
    </AuthForm>
  );
};

export default Signup;
