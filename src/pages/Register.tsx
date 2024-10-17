import React, { useState } from "react";
import { account, databases } from "../appwrite";
import { ID } from "appwrite";
import NavBar from "../components/NavBar";
import { toast, ToastContainer } from "react-toastify";


const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [apto, setApto] = useState<string>("");

  const handleRegister = async (): Promise<void> => {
    try {
      // Cria uma nova conta de usuário
      const userID = ID.unique();
      await account.create(userID, email, password, name);
      await account.createEmailPasswordSession(email, password);

      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,  // Database ID
        import.meta.env.VITE_APPWRITE_USER_PROFILES_COLLECTION_ID,  // Collection ID
        ID.unique(),  // Unique document ID
        {
          userId: userID,
          aptoNumber: apto,  // Saving the aptoNumber in the collection
        }
      );

      const redirectURL = "http://localhost:5173/email-verification";
      await account.createVerification(redirectURL);
      await account.deleteSession("current");

      toast(() => <p> Registro bem-sucedido! <br /> Por favor, verifique seu e-mail para ativar sua conta. </p>);

    } catch (error) {
      console.error("Erro no registro:", error);
      toast(() => <p> Registro falhou. <br /> Por favor, tente novamente.</p>);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Registrar</h2>

          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Número do Apartamento"
            value={apto}
            onChange={(e) => setApto(e.target.value)}
            className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleRegister}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Registrar
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
