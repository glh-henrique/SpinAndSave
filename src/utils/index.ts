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

interface MonthlyData {
  Lavagens: {
      total: number;
      valorTotal: number;
  };
  Secagens: {
      total: number;
      valorTotal: number;
  };
}

export function getMonthlyReport(data: IExpense[]) {
  const valorPorLavagem = 0; 
  const valorPorSecagem = 0; 

  const getMonthName = (dateStr: string): string => {
      const date = new Date(dateStr);
      return date.toLocaleString("pt-BR", { month: "long" });
  };

  const monthlyData: { [month: string]: MonthlyData } = {};

  data.forEach(item => {
      const month = getMonthName(item.date);
      
      if (!monthlyData[month]) {
          monthlyData[month] = { Lavagens: { total: 0, valorTotal: 0 }, Secagens: { total: 0, valorTotal: 0 } };
      }
      
      if (item.type === "Lavagem") {
          monthlyData[month].Lavagens.total += item.amount;
          monthlyData[month].Lavagens.valorTotal += item.amount * valorPorLavagem;
      } else if (item.type === "Secagem") {
          monthlyData[month].Secagens.total += item.amount;
          monthlyData[month].Secagens.valorTotal += item.amount * valorPorSecagem;
      }
  });

  const result = Object.keys(monthlyData).map(month => ({
      month,
      Lavagens: monthlyData[month].Lavagens,
      Secagens: monthlyData[month].Secagens
  }));

  return result;
}
