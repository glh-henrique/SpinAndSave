import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormLabel,
  TextField,
  InputAdornment,
  Box
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { IExpenseModalProps } from "../utils/interfaces";
import { formatInput } from "../utils";

const ExpenseModal: React.FC<IExpenseModalProps> = ({
  isModalOpen,
  closeModal,
  onSave,
  editExpense,
}) => {
  const today = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const [type, setType] = useState<string>("Lavagem");
  const [amount, setAmount] = useState<string | number>("");
  const [date, setDate] = useState<Dayjs | null>(null);

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  useEffect(() => {
    if (editExpense && isModalOpen) {
      setType(editExpense.type);
      setAmount(editExpense.amount);
      setDate(dayjs(editExpense.date));
    }
  }, [editExpense, isModalOpen]);

  const handleClose = () => {
    setType('Lavagem');
    setAmount("");
    setDate(null);
    closeModal();
  }

  const handleSave = (): void => {
    if (!type || !amount || !date) {
      handleClose();
      return;
    }

    onSave({ type, amount: Number(amount), date: date! });
    handleClose();
  };

  return (
    <>
      <Dialog
        open={isModalOpen}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          {editExpense ? "Editar Despesa" : "Adicionar Despesa"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth >
              <FormLabel htmlFor="type">Tipo de Despesa</FormLabel>
              <Select
                id="type"
                value={type}
                label="Tipo de Despesa"
                onChange={handleChange}
              >
                <MenuItem value="Lavagem">Lavagem</MenuItem>
                <MenuItem value="Secagem">Secagem</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <FormLabel htmlFor="valor">Valor</FormLabel>
              <TextField
                onChange={(e) => setAmount(formatInput(e.target.value))}
                id="valor"
                type="text"
                name="valor"
                value={amount}
                required
                fullWidth
                variant="outlined"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">€</InputAdornment>
                    ),
                  },
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel htmlFor="date">Data</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={date}
                  onChange={setDate}
                  maxDate={dayjs(today)}
                  minDate={dayjs(lastMonth)}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancelar</Button>
          <Button onClick={() => handleSave()}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExpenseModal;
