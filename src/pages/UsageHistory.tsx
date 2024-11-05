import React, { useEffect, useState } from 'react';
import { databases } from '../appwrite';
import { IExpense } from '../utils/interfaces';
import { documentToExpense, getMonthlyReport } from '../utils';
import { Models, Query } from 'appwrite';
import ExpenseSummary from '../components/ExpenseSummary';
import Grid from '@mui/material/Grid2';
import { useAuth } from '../context/AuthContext';


interface MonthlyReportItem {
  month: string;
  Lavagens: {
    total: number;
    valorTotal: number;
  };
  Secagens: {
    total: number;
    valorTotal: number;
  };
}

const UsageHistory: React.FC = () => {
  const { user } = useAuth();
  const [expensesByMonth, setExpensesByMonth] = useState<MonthlyReportItem[]>([]);
  const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const EXPENSES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_EXPENSES_COLLECTION_ID;

  useEffect(() => {
    const fetchUser = async () => {
      try {

        fetchExpenses(user!.id);

      } catch (error: any) {
        console.log(error)
      }
    };

    fetchUser();
  }, []);

  const fetchExpenses = async (familyId: string) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        EXPENSES_COLLECTION_ID,
        [Query.equal("familyId", familyId)]
      );

      const expensesData: IExpense[] = response.documents.map((doc: Models.Document) =>
        documentToExpense(doc)
      );
      setExpensesByMonth(getMonthlyReport(expensesData));
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
    }
  };


  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {expensesByMonth.map((item, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 6 }}>
            <ExpenseSummary month={item.month} washing={item.Lavagens.total} drying={item.Secagens.total} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default UsageHistory;
