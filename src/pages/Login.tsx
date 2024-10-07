import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await account.deleteSession("current");
      } catch (error) {
        console.error("Erro ao encerrar a sessão:", error);
      }
    };
    
    logoutUser(); 
  }, []);

  const handleLogin = async (): Promise<void> => {
    try {
      await account.createEmailPasswordSession(email, password);
      navigate("/home");
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Login falhou. Verifique suas credenciais.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
