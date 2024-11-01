import { Models } from "appwrite";
import { IExpense } from "./interfaces";

export function getCurrentMonth() {
  const date = new Date();
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  return monthNames[date.getMonth()];
}

export function getCurrentMonthExpenses(expenses: IExpense[]) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  let lavagemTotal = 0;
  let secagemTotal = 0;

  expenses.forEach(expense => {
    const expenseDate = new Date(expense.date);
    const expenseYear = expenseDate.getFullYear();
    const expenseMonth = expenseDate.getMonth();

    if (expenseYear === currentYear && expenseMonth === currentMonth) {

      if (expense.type === "Lavagem") {
        lavagemTotal += expense.amount;
      } else if (expense.type === "Secagem") {
        secagemTotal += expense.amount;
      }
    }
  });

  return {
    lavagem: lavagemTotal,
    secagem: secagemTotal
  };
}

export const documentToExpense = (doc: Models.Document): IExpense => {
  return {
    $id: doc.$id,
    type: doc.type as string,
    amount: doc.amount as number,
    date: doc.date as any,
    familyId: doc.familyId as string,
  };
};