import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser, logoutUser } from "../../redux/slices/authSlice";

const AuthTest = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleRegister = () => {
    dispatch(registerUser({ email, password, role: "user" }));  
  };

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <h2>Auth Test</h2>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister} disabled={loading}>Register</button>
      <button onClick={handleLogin} disabled={loading}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      {user && <p>Logged in as: {user.email}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AuthTest;
