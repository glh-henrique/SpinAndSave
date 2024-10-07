import React, { useState, useEffect } from "react";
import { databases } from "../appwrite";
import { ID } from "appwrite";
import ExpenseModal from "../components/ExpenseModal";

interface Expense {
  $id: string; 
  type: string;
  amount: number;
  date: string;
}

const DATABASE_ID = ""; 
const COLLECTION_ID = ""; 

const Home: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editExpenseIndex, setEditExpenseIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const isExpense = (doc: any): doc is Expense => {
    return typeof doc.type === 'string' && 
           typeof doc.amount === 'number' && 
           typeof doc.date === 'string';
  };

  const fetchExpenses = async () => {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      
      const expensesData: Expense[] = response.documents
        .filter(isExpense) 
        .map((doc: any) => ({
          $id: doc.$id,
          type: doc.type,
          amount: doc.amount,
          date: doc.date,
        }));
      setExpenses(expensesData);
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
    }
  };

  const handleAddExpense = async (expense: Omit<Expense, "$id">): Promise<void> => {
    try {
      if (editExpenseIndex !== null) {
        // Atualiza a despesa existente
        const updatedExpense = await databases.updateDocument(
          DATABASE_ID,
          COLLECTION_ID,
          expenses[editExpenseIndex].$id,
          expense
        );
        if (isExpense(updatedExpense)) {
          const updatedExpenses = [...expenses];
          updatedExpenses[editExpenseIndex] = updatedExpense;
          setExpenses(updatedExpenses);
        }
      } else {
        // Cria uma nova despesa
        const newExpense = await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          ID.unique(), 
          expense 
        );
        if (isExpense(newExpense)) {
          setExpenses([...expenses, newExpense]);
        }
      }
    } catch (error) {
      console.error("Erro ao adicionar/editar despesa:", error);
    }

    setIsModalOpen(false);
    setEditExpenseIndex(null);
  };

  const handleDeleteExpense = async (index: number): Promise<void> => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, expenses[index].$id);
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
          editExpense={editExpenseIndex !== null ? expenses[editExpenseIndex] : null}
        />
      )}
    </div>
  );
};

export default Home;
