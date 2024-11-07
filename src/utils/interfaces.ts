export interface IAppThemeProps {
  children: React.ReactNode;
}

export interface IProtectedRouteProps {
  children: JSX.Element;
}

export interface IExpense {
  $id: string;
  type: string;
  amount: number;
  date: any;
  familyId: string;
}

export interface IExpenseSummary {
  lavagem: number;
  secagem: number;
  countSecagemTotal: number;
  countLavagemTotal: number;
}

export interface IExpenseModal {
  type: string;
  amount: number;
  date: any;
}

export interface IExpenseModalProps {
  isModalOpen: boolean,
  closeModal: () => void;
  onSave: (expense: IExpenseModal) => void;
  editExpense: IExpense | null;
}

export interface IExpenseSummaryProps {
  washing: number;
  drying: number;
  countWashing: number;
  countDrying: number;
  month?: string
}

export interface MonthlyData {
  Lavagens: {
    total: number;
    valorTotal: number;
  };
  Secagens: {
    total: number;
    valorTotal: number;
  };
}
