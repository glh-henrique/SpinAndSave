import React, { useEffect, useState } from 'react';
import { account, databases } from '../appwrite';
import { IExpense } from '../utils/interfaces';
import { documentToExpense, getMonthlyReport } from '../utils';
import { Models, Query } from 'appwrite';
import ExpenseSummary from '../components/ExpenseSummary';


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
	const [expensesByMonth, setExpensesByMonth] = useState<MonthlyReportItem[]>([]);
	const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
	const EXPENSES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_EXPENSES_COLLECTION_ID;

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const user = await account.get();

				fetchExpenses(user.$id);

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
			console.log('expensesByMonth', expensesByMonth)
		} catch (error) {
			console.error("Erro ao buscar despesas:", error);
		}
	};


	return (
		<>
			{expensesByMonth.map((item, index) => (
				<>
				<br />
					<ExpenseSummary key={index} month={item.month} washing={item.Lavagens.total} drying={item.Secagens.total} />
					<br />
				</>
			))}
		</>
	);
};

export default UsageHistory;
