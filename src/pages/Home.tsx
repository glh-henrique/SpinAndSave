import React, { useState, useEffect } from "react";

import { Query, Models, ID } from "appwrite";
import { account, databases } from "../appwrite";
import ExpenseModal from "../components/ExpenseModal";
import ExpenseSummary from "../components/ExpenseSummary";
import { getCurrentMonthExpenses } from "../utils";
import {
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  Button,
  styled,
} from "@mui/material";
import MoreIcon from '@mui/icons-material/MoreVert'
import Add from '@mui/icons-material/Add'
import AirwaveIcon from '@mui/icons-material/AirOutlined'
import LaundryIcon from '@mui/icons-material/LocalLaundryService'
import dayjs from "dayjs";

const RoundedButton = styled(Button)({
  width: '50px',
  height: '50px',
  minWidth: '0px',
  borderRadius: '50%',
  position: 'fixed',
  bottom: "30px",
  right: "30px"
});

export interface Expense {
  $id: string;
  type: string;
  amount: number;
  date: any;
  familyId: string;
}

export interface ExpenseSummary {
  lavagem: number;
  secagem: number;
}

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const EXPENSES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_EXPENSES_COLLECTION_ID;

const Home: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expense, setExpense] = useState<Expense | null>(null);
  const [expenseIndex, setExpenseIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [familyId, setFamilyId] = useState<string>("");
  const [expenseSummary, setExpenseSummary] = useState<ExpenseSummary>({ lavagem: 0, secagem: 0 });

  const documentToExpense = (doc: Models.Document): Expense => {
    return {
      $id: doc.$id,
      type: doc.type as string,
      amount: doc.amount as number,
      date: doc.date as any,
      familyId: doc.familyId as string,
    };
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();

        fetchExpenses(user.$id);
        setFamilyId(user.$id)

      } catch (error: any) {
        console.log(error)
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (expenses.length === 0) return;

    const expenseSummary = getCurrentMonthExpenses(expenses)
    setExpenseSummary(expenseSummary)
  }, [expenses])

  const fetchExpenses = async (familyId: string) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        EXPENSES_COLLECTION_ID,
        [Query.equal("familyId", familyId)]
      );

      const expensesData: Expense[] = response.documents.map((doc: Models.Document) =>
        documentToExpense(doc)
      );
      setExpenses(expensesData);
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
    }
  };

  const handleAddExpense = async (
    expense: Omit<Expense, "$id" | "familyId">
  ): Promise<void> => {
    try {
      if (expenseIndex !== null) {
        const updatedExpense = await databases.updateDocument(
          DATABASE_ID,
          EXPENSES_COLLECTION_ID,
          expenses[expenseIndex].$id,
          { ...expense, familyId }
        );

        const updatedExpenses = [...expenses];
        updatedExpenses[expenseIndex] = documentToExpense(updatedExpense);
        setExpenses(updatedExpenses);
      } else {
        // Cria uma nova despesa
        const newExpense = await databases.createDocument(
          DATABASE_ID,
          EXPENSES_COLLECTION_ID,
          ID.unique(),
          { ...expense, familyId }
        );

        // Mapeia o documento para Expense
        setExpenses([...expenses, documentToExpense(newExpense)]);
      }
    } catch (error) {
      console.error("Erro ao adicionar/editar despesa:", error);
    }

    setIsModalOpen(false);
  };

  const handleDeleteExpense = async (index: number | null): Promise<void> => {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        EXPENSES_COLLECTION_ID,
        expenses[index!].$id
      );
      const updatedExpenses = expenses.filter((_, i) => i !== index);
      setExpenses(updatedExpenses);
      handleClose();
    } catch (error) {
      console.error("Erro ao excluir despesa:", error);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setExpense(null);
    setExpenseIndex(null);
    setIsModalOpen(false);

  };

  const handleOpenItemOptions = (event: React.MouseEvent<HTMLElement>, expense: Expense, index: number) => {
    setAnchorEl(event.currentTarget);
    setExpense(expense);
    setExpenseIndex(index);
  };

  return (
    <div>
      <div>
        <h1>Controle de Despesas</h1>

        <ExpenseSummary washing={expenseSummary.lavagem} drying={expenseSummary.secagem} />

        <Typography sx={{ marginTop: '10px', marginBottom: '5px' }}>Listagem</Typography>
        {expenses.length > 0 ? (
          <>
            {expenses.map((expense, index) => (
              <List key={index}>
                <ListItem sx={{ padding: 0 }}>
                  <ListItemAvatar>
                    <Avatar>
                      {
                        expense.type === 'Lavagem' ? <LaundryIcon /> : <AirwaveIcon />
                      }

                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Tipo"
                    primaryTypographyProps={{ variant: 'caption' }}
                    secondary={expense.type}
                    secondaryTypographyProps={{ variant: 'subtitle2' }}
                  />
                  <ListItemText
                    primary="Data"
                    primaryTypographyProps={{ variant: 'caption' }}
                    secondary={String(dayjs(expense.date))}
                    secondaryTypographyProps={{ variant: 'subtitle2' }}
                  />
                  <ListItemText
                    primary="Valor"
                    primaryTypographyProps={{ variant: 'caption' }}
                    secondary={`€ ${expense.amount.toFixed(2)}`}
                    secondaryTypographyProps={{ variant: 'subtitle2' }}
                  />
                  <IconButton
                    id={`lock-menu`}
                    aria-haspopup="listbox"
                    aria-controls={`lock-menu-${index}`}
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(event) => handleOpenItemOptions(event, expense, index)}
                    aria-label="Edit">
                    <MoreIcon />
                  </IconButton>

                </ListItem>
              </List>
            ))}
            <Menu
              id={`lock-menu`}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'lock-button',
                role: 'listbox',
              }}
            >

              <MenuItem
                onClick={() => setIsModalOpen(true)}
              >
                Editar
              </MenuItem>
              <MenuItem
                onClick={() => handleDeleteExpense(expenseIndex)}
              >
                Excuir
              </MenuItem>

            </Menu>
          </>
        ) : (
          <Typography >Nenhuma despesa encontrada.</Typography>
        )}

        <ExpenseModal 
          isModalOpen={isModalOpen} 
          closeModal={() => handleClose()} 
          onSave={handleAddExpense}
          editExpense={expense}
        />
      </div>
      <RoundedButton variant="contained" onClick={() => setIsModalOpen(true)}>
        <Add />
      </RoundedButton>
    </div>
  );
};

export default Home;
