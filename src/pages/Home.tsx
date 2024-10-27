import React, { useState, useEffect } from "react";

import { Query, Models, ID } from "appwrite";
import { account, databases } from "../appwrite";
import ExpenseModal from "../components/ExpenseModal";
import ExpenseSummary from "../components/ExpenseSummary";
import { getCurrentMonthExpenses } from "../utils";

export interface Expense {
  $id: string;
  type: string;
  amount: number;
  date: string;
  familyId: string;
}

export interface ExpenseSummary {
  lavagem: number;
  secagem: number;
} 

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const EXPENSES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_EXPENSES_COLLECTION_ID;

const Home: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editExpenseIndex, setEditExpenseIndex] = useState<number | null>(null);
  const [familyId, setFamilyId] = useState<string>("");
  const [expenseSummary, setExpenseSummary] = useState<ExpenseSummary>({lavagem: 0, secagem: 0});

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

  // Função para buscar o familyId do usuário logado
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Obtém o usuário autenticado
        const user = await account.get();

        // Busca as despesas associadas ao familyId
        fetchExpenses(user.$id);
        setFamilyId(user.$id)


      } catch (error: any) {
        console.log(error)
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if(expenses.length === 0) return;
    console.log('getCurrentMonthExpenses')
    const expenseSummary  = getCurrentMonthExpenses(expenses)
    setExpenseSummary(expenseSummary)
  },[expenses])

  // Função para buscar as despesas da família
  const fetchExpenses = async (familyId: string) => {
    console.log('fetch')
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
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl p-6">
        <p className="text-3xl font-bold mb-6 text-center">Controle de Despesas</p>

        <ExpenseSummary washing={expenseSummary.lavagem} drying={expenseSummary.secagem} />

        <div className="mb-4 text-right">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            onClick={() => setIsModalOpen(true)}
          >
            Adicionar Despesa
          </button>

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

        {/* Display the expenses in a table */}
        {expenses.length > 0 ? (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Tipo</th>
                <th className="px-4 py-2 text-left">Valor</th>
                <th className="px-4 py-2 text-left">Data</th>
                <th className="px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={expense.$id} className="border-t">
                  <td className="px-4 py-2">{expense.type}</td>
                  <td className="px-4 py-2">€{expense.amount.toFixed(2)}</td>
                  <td className="px-4 py-2">{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 space-x-4">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => {
                        setEditExpenseIndex(index);
                        setIsModalOpen(true);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteExpense(index)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 text-center">Nenhuma despesa encontrada.</p>
        )}


      </div>
    </div>
  );
};

export default Home;
