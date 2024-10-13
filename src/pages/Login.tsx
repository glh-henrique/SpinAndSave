import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account, databases } from "../appwrite";


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  // Encerra qualquer sessão ativa ao carregar a página de login
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

      // Verifica se o e-mail do usuário está verificado
      const user = await account.get();
      if (!user.emailVerification) {
        alert("Por favor, verifique seu e-mail antes de fazer login.");
        // Opcional: Reenvia o e-mail de verificação
        const redirectURL = "http://localhost:5173/email-verification";
        await account.createVerification(redirectURL);
        await account.deleteSession("current"); // Encerra a sessão
        return;
      } else {
        // // Cria o perfil do usuário na coleção 'user_profiles'
        // await databases.createDocument(
        //   import.meta.env.VITE_APPWRITE_DATABASE_ID,
        //   import.meta.env.VITE_APPWRITE_USER_PROFILES_COLLECTION_ID,
        //   user.$id, // Usa o ID do usuário como ID do documento
        //   {
        //     userId: user.$id,
        //     email: user.email,
        //     name: user.name,
        //     familyId: "", // Inicialmente sem família
        //   }
        // );
      }

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
      <button onClick={handleLogin}>Entrar</button>
      <p>
        Não tem uma conta? <a href="/register">Registre-se aqui</a>
      </p>
    </div>
  );
};

export default Login;
