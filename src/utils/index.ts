import { Expense } from "../pages/Home";

export function getCurrentMonth() {
    const date = new Date();
    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    return monthNames[date.getMonth()];
}

export function getCurrentMonthExpenses(expenses: Expense[]) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-indexed, so January is 0
  
    let lavagemTotal = 0;
    let secagemTotal = 0;
  
    expenses.forEach(expense => {
      const expenseDate = new Date(expense.date);
      const expenseYear = expenseDate.getFullYear();
      const expenseMonth = expenseDate.getMonth();
  
      // Check if the expense date is in the current month and year
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
  