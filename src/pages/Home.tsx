import React, { useState, useEffect } from "react";

import { Query, Models, ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import { account, databases } from "../appwrite";
import ExpenseModal from "../components/ExpenseModal";

interface Expense {
  $id: string;
  type: string;
  amount: number;
  date: string;
  familyId: string;
}

interface UserProfile {
  $id: string;
  userId: string;
  email: string;
  name: string;
  familyId: string;
}

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID; 
const USER_PROFILES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USER_PROFILES_COLLECTION_ID;
const EXPENSES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_EXPENSES_COLLECTION_ID;

const Home: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editExpenseIndex, setEditExpenseIndex] = useState<number | null>(null);
  const [familyId, setFamilyId] = useState<string>("");
  const navigate = useNavigate();

  // Função utilitária para mapear Document para Expense
  const documentToExpense = (doc: Models.Document): Expense => {
    return {
      $id: doc.$id,
      type: doc.type as string,
      amount: doc.amount as number,
      date: doc.date as string,
      familyId: doc.familyId as string,
    };
  };

  // Função utilitária para mapear Document para UserProfile
  const documentToUserProfile = (doc: Models.Document): UserProfile => {
    return {
      $id: doc.$id,
      userId: doc.userId as string,
      email: doc.email as string,
      name: doc.name as string,
      familyId: doc.familyId as string,
    };
  };

  // Função para buscar o familyId do usuário logado
  useEffect(() => {
    const fetchFamilyId = async () => {
      try {
        // Obtém o usuário autenticado
        const user = await account.get();
  
        // Tenta obter o perfil do usuário
        const profileResponse = await databases.getDocument(
          DATABASE_ID,
          USER_PROFILES_COLLECTION_ID,
          user.$id
        );
  
        // Mapeia o perfil do usuário
        const userProfile = documentToUserProfile(profileResponse);
  
        // Verifica se o usuário tem um familyId
        if (userProfile.familyId) {
          setFamilyId(userProfile.familyId);
          // Busca as despesas associadas ao familyId
          fetchExpenses(userProfile.familyId);
        }
      } catch (error: any) {
        if (error.code === 404) {
          console.error("Perfil do usuário não encontrado:", error);
          alert("Perfil do usuário não encontrado. Por favor, faça login novamente.");
          navigate("/"); // Redireciona para o login
        } else {
          console.error("Erro ao obter o familyId do usuário:", error);
          alert("Ocorreu um erro. Por favor, tente novamente.");
          navigate("/"); // Redireciona para o login ou trata conforme necessário
        }
      }
    };
  
    fetchFamilyId();
  }, []);

  // Função para buscar as despesas da família
  const fetchExpenses = async (familyId: string) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        EXPENSES_COLLECTION_ID,
        [Query.equal("familyId", familyId)]
      );

      const expensesData: Expense[] = response.documents.map((doc: Models.Document) =>
        documentToExpense(doc)
      );
      setExpenses(expensesData);
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
    }
  };

  // Função para adicionar ou editar uma despesa
  const handleAddExpense = async (
    expense: Omit<Expense, "$id" | "familyId">
  ): Promise<void> => {
    try {
      if (editExpenseIndex !== null) {
        // Atualiza a despesa existente
        const updatedExpense = await databases.updateDocument(
          DATABASE_ID,
          EXPENSES_COLLECTION_ID,
          expenses[editExpenseIndex].$id,
          { ...expense, familyId }
        );

        // Mapeia o documento para Expense
        const updatedExpenses = [...expenses];
        updatedExpenses[editExpenseIndex] = documentToExpense(updatedExpense);
        setExpenses(updatedExpenses);
      } else {
        // Cria uma nova despesa
        const newExpense = await databases.createDocument(
          DATABASE_ID,
          EXPENSES_COLLECTION_ID,
          ID.unique(),
          { ...expense, familyId }
        );

        // Mapeia o documento para Expense
        setExpenses([...expenses, documentToExpense(newExpense)]);
      }
    } catch (error) {
      console.error("Erro ao adicionar/editar despesa:", error);
    }

    setIsModalOpen(false);
    setEditExpenseIndex(null);
  };

  // Função para excluir uma despesa
  const handleDeleteExpense = async (index: number): Promise<void> => {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        EXPENSES_COLLECTION_ID,
        expenses[index].$id
      );
      const updatedExpenses = expenses.filter((_, i) => i !== index);
      setExpenses(updatedExpenses);
    } catch (error) {
      console.error("Erro ao excluir despesa:", error);
    }
  };

  return (
    <div className="home-container">
      <h2>Despesas de Lavagem e Secagem</h2>
      <button onClick={() => setIsModalOpen(true)}>Adicionar Despesa</button>
      <ul>
        {expenses.map((expense, index) => (
          <li key={expense.$id}>
            {`${expense.type} - ${expense.amount} EUR - ${expense.date}`}
            <button onClick={() => setEditExpenseIndex(index)}>Editar</button>
            <button onClick={() => handleDeleteExpense(index)}>Excluir</button>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <ExpenseModal
          closeModal={() => setIsModalOpen(false)}
          onSave={handleAddExpense}
          editExpense={
            editExpenseIndex !== null ? expenses[editExpenseIndex] : null
          }
        />
      )}
    </div>
  );
};

export default Home;
