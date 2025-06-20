import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookContext } from '../context/BookContext';
import { loginUser, registerUser } from '../api';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(BookContext);

  const toggleMode = () => {
    setErr("");
    setIsRegister(!isRegister);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      let response;
      if (isRegister) {
        if (!name.trim()) {
          setErr("Name is required for registration");
          setLoading(false);
          return;
        }
        response = await registerUser({ name: name.trim(), email: email.trim(), password: password.trim() });
      } else {
        response = await loginUser({ email: email.trim(), password: password.trim() });
      }
      setUser(response.data.user);
      setToken(response.data.token);
      navigate("/");
    } catch (error) {
      setErr(error.response?.data?.message || (isRegister ? "Registration failed" : "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl mb-4 font-semibold text-center">{isRegister ? "Register" : "Login"}</h2>
      {err && <p className="text-red-600 mb-3">{err}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {isRegister && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            required={isRegister}
            onChange={e => setName(e.target.value)}
            className="p-2 border rounded"
            disabled={loading}
            autoComplete="name"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          className="p-2 border rounded"
          autoComplete="email"
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
          className="p-2 border rounded"
          autoComplete={isRegister ? "new-password" : "current-password"}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className={`py-2 rounded text-white transition ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (isRegister ? "Registering..." : "Logging in...") : (isRegister ? "Register" : "Login")}
        </button>
      </form>
      <p className="mt-4 text-center">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={toggleMode}
          className="text-blue-600 underline hover:text-blue-800"
          disabled={loading}
          type="button"
        >
          {isRegister ? "Login here" : "Register here"}
        </button>
      </p>
    </div>
  );
};

export default Login;
