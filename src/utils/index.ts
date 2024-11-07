import { Models } from "appwrite";
import { IExpense, MonthlyData } from "./interfaces";

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
  let countLavagemTotal = 0;
  let secagemTotal = 0;
  let countSecagemTotal = 0;

  expenses.forEach(expense => {
    const expenseDate = new Date(expense.date);
    const expenseYear = expenseDate.getFullYear();
    const expenseMonth = expenseDate.getMonth();

    if (expenseYear === currentYear && expenseMonth === currentMonth) {

      if (expense.type === "Lavagem") {
        lavagemTotal += expense.amount;
        countLavagemTotal++;
      } else if (expense.type === "Secagem") {
        secagemTotal += expense.amount;
        countSecagemTotal++;
      }
    }
  });

  return {
    lavagem: lavagemTotal,
    secagem: secagemTotal,
    countSecagemTotal,
    countLavagemTotal
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


export function getMonthlyReport(data: IExpense[]) {

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
      monthlyData[month].Lavagens.total++;
      monthlyData[month].Lavagens.valorTotal += item.amount;
    } else if (item.type === "Secagem") {
      monthlyData[month].Secagens.total++;
      monthlyData[month].Secagens.valorTotal += item.amount;
    }
  });

  const result = Object.keys(monthlyData).map(month => ({
    month,
    Lavagens: monthlyData[month].Lavagens,
    Secagens: monthlyData[month].Secagens
  }));

  return result;
}

export function formatInput(value: string): string {
  const formattedValue = value.replace(',', '.').replace(/[^0-9.]/g, '');
  const parts = formattedValue.split('.');

  if (parts.length > 2) {
    return `${parts[0]}.${parts[1]}`;
  }
  return formattedValue;
}
