import React, { useState } from "react";
import { account } from "../appwrite";
import { ID } from "appwrite";


const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [apto, setApto] = useState<string>("");

  const handleRegister = async (): Promise<void> => {
    try {
      // Cria uma nova conta de usuário
      await account.create(ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password);

      const redirectURL = "http://localhost:5173/email-verification";
      await account.createVerification(redirectURL);
      await account.deleteSession("current");

      alert("Registro bem-sucedido! Por favor, verifique seu e-mail para ativar sua conta.");

    } catch (error) {
      console.error("Erro no registro:", error);
      alert("Registro falhou. Por favor, tente novamente.");
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Apartamento"
        value={apto}
        onChange={(e) => setApto(e.target.value)}
      />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};

export default Register;
