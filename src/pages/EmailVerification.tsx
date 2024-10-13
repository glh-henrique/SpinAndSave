import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { account } from "../appwrite";

const Verification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const userId = params.get("userId");
        const secret = params.get("secret");

        if (userId && secret) {
          await account.updateVerification(userId, secret);
          alert("E-mail verificado com sucesso! Você já pode fazer login.");
          navigate("/");
        } else {
          alert("Link de verificação inválido.");
          navigate("/");
        }
      } catch (error) {
        console.error("Erro na verificação de e-mail:", error);
        alert("A verificação falhou. Por favor, tente novamente.");
        navigate("/");
      }
    };

    verifyUser();
  }, [location]);

  return <div>Verificando seu e-mail...</div>;
};

export default Verification;
