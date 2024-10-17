import React, { useState, useEffect } from "react";

interface Expense {
  type: string;
  amount: number;
  date: string;
}

interface ExpenseModalProps {
  closeModal: () => void;
  onSave: (expense: Expense) => void;
  editExpense: Expense | null;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({
  closeModal,
  onSave,
  editExpense,
}) => {
  const [type, setType] = useState<string>("Lavagem");
  const [amount, setAmount] = useState<number | string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    if (editExpense) {
      setType(editExpense.type);
      setAmount(editExpense.amount);
      setDate(editExpense.date);
    }
  }, [editExpense]);

  const handleSave = (): void => {
    onSave({ type, amount: Number(amount), date });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-center">
        {editExpense ? "Editar Despesa" : "Adicionar Despesa"}
      </h3>

      {/* Select type of expense */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Tipo de Despesa
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">--</option>
          <option value="Lavagem">Lavagem</option>
          <option value="Secagem">Secagem</option>
        </select>
      </div>

      {/* Amount input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Valor (€)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite o valor"
        />
      </div>

      {/* Date input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Data
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Action buttons */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={closeModal}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Salvar
        </button>
      </div>
    </div>
  </div>
  );
};

export default ExpenseModal;
