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
    <div className="modal-container">
      <h3>{editExpense ? "Editar Despesa" : "Adicionar Despesa"}</h3>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Lavagem">Lavagem</option>
        <option value="Secagem">Secagem</option>
      </select>
      <input
        type="number"
        placeholder="Valor"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleSave}>Salvar</button>
      <button onClick={closeModal}>Cancelar</button>
    </div>
  );
};

export default ExpenseModal;
