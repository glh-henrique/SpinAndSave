import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../appwrite";

import { ToastContainer, toast } from 'react-toastify';


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

      // Verifica se o e-mail do usuário está verificado
      const user = await account.get();
      if (!user.emailVerification) {
        alert("Por favor, verifique seu e-mail antes de fazer login.");
        // Opcional: Reenvia o e-mail de verificação
        const redirectURL = "https://spin-and-save.vercel.app/email-verification";
        await account.createVerification(redirectURL);
        await account.deleteSession("current"); // Encerra a sessão
        return;
      }
      navigate("/home");
    } catch (error) {
      console.error("Erro no login:", error);
      toast(() => <div>Login falhou. <br /> Verifique suas credenciais.</div>);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Spin And Save"
            src="/img/spin-and-save.png"
            className="mx-auto h-48 w-auto"
          />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2 mb-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleLogin}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Não tem uma conta? {' '}
            <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Registre-se aqui
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
