import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import AuthInput from "../components/AuthInput";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, error, loading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
    if (!error) {
      navigate("/");
    }
  };

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
    if (!error) {
      navigate("/");
    }
  };

  return (
    <AuthForm
      title="Sign in to your account"
      onSubmit={handleLogin}
      error={error || undefined}
      submitText={loading ? "Signing in..." : "Sign in"}
      onGoogleClick={handleGoogleLogin}
    >
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
            href="/signup"
            className="font-medium text-[#0fa9ff] hover:text-[#0288d1]"
          >
            Don't have an account? Sign up
          </a>
        </div>
      </div>
    </AuthForm>
  );
};

export default Login;
