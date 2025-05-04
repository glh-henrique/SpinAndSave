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
  Box,
  Alert
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { MachineProps } from "../pages/LaundryStatus";


interface TimeMachineModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  machines: MachineProps[];
  onSave: (data: any) => void;
}

const TimeMachineModal: React.FC<TimeMachineModalProps> = ({
  isModalOpen,
  closeModal,
  machines,
  onSave,
}) => {
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [type, setType] = useState<string>("");
  const [machine, setMachine] = useState<string>("");
  const [machineToShow, setMachineToShow] = useState<MachineProps[]>([]);
  const [time, setTime] = useState<number>(0);
  const [error, setError] = useState('');
  const MAX_HOURS = 2;

  const handleChangeService = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleChangeMachine = (event: SelectChangeEvent) => {
    setMachine(event.target.value as string);
  };

  const handleTime = (newTime: Dayjs | null) => {
    if (newTime) {
      const todayTime = dayjs().startOf('day')
        .hour(newTime.hour())
        .minute(newTime.minute())
        .second(0)
        .millisecond(0);

      setSelectedTime(todayTime);
    } else {
      setSelectedTime(null);
    }
  };

  useEffect(() => {
    const machinetoShow = machines.filter(
      (machine) => machine.type === type && machine.status === "available"
    );

    console.log('machinetoShow', machinetoShow)
    setMachineToShow(machinetoShow);

  }, [type]);

  useEffect(() => {
    if (!selectedTime) {
      setTime(0);
      return;
    }

    const hours = selectedTime.hour();
    const minutes = selectedTime.minute();

    if (hours > MAX_HOURS || (hours === MAX_HOURS && minutes > 0)) {
      setError(`O tempo máximo permitido é de ${MAX_HOURS} horas.`);
    } else {
      setError('');
      const totalSeconds = (hours * 3600) + (minutes * 60);
      setTime(totalSeconds);
    }
  }, [selectedTime]);


  const handleClose = () => {
    setType("");
    setMachine("");
    closeModal();
  }

  const setTimeForMachine = (): MachineProps[] => {
    return machines.map((m) => {
      if (m.name === machine) {
        return { ...m, status: 'in use', timeRemaining: time };
      }
      return m;
    });
  }

  const handleSave = (): void => {
    console.log('setTimeForMachine())', setTimeForMachine());
    if (!type || !machine || !time) {
      handleClose();
      return;
    }

    onSave(setTimeForMachine());
    handleClose();
  };

  return (
    <>
      <Dialog
        open={isModalOpen}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          Adicionar Tempo
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth >
              <FormLabel htmlFor="type">Tipo de Serviço</FormLabel>
              <Select
                id="type"
                value={type}
                label="Tipo de Despesa"
                onChange={handleChangeService}
              >
                <MenuItem value="Lavar">Lavagem</MenuItem>
                <MenuItem value="Secar">Secagem</MenuItem>
              </Select>
            </FormControl>
            {type !== "" && (
              <FormControl fullWidth >
                <FormLabel htmlFor="type">Maquina</FormLabel>
                <Select
                  id="machine"
                  value={machine}
                  label="Maquina"
                  onChange={handleChangeMachine}
                >
                  {machineToShow.map((machine) => (
                    <MenuItem key={machine.name} value={machine.name}>
                      {machine.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <FormControl fullWidth>
              <FormLabel htmlFor="date">Data</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  views={['hours', 'minutes']}
                  ampm={false}
                  value={selectedTime}
                  openTo="hours"
                  onChange={handleTime}
                />
              </LocalizationProvider>
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancelar</Button>
          <Button onClick={() => handleSave()}>Activar Timer</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TimeMachineModal;
