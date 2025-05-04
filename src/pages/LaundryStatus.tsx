import React, { useState, useEffect } from 'react';
import { Box, Button, styled } from '@mui/material';
import { LaundryMachineCard } from '../components/LaundryMachineCard';
import { Add } from '@mui/icons-material';
import TimeMachineModal from '../components/TimeMachineModal';

export interface MachineProps {
  name: string;
  status: 'in use' | 'available' | 'idle';
  timeRemaining: number;
  type: 'Lavar' | 'Secar';
  number: number;
}
const RoundedButton = styled(Button)({
  width: '50px',
  height: '50px',
  minWidth: '0px',
  borderRadius: '50%',
  position: 'fixed',
  bottom: "30px",
  right: "30px"
});

const LaundryStatus: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [machines, setMachines] = useState<MachineProps[]>([
    { name: 'Lavar 1', status: 'available', timeRemaining: 0, type: 'Lavar', number: 1 },
    { name: 'Secar 1', status: 'available', timeRemaining: 0, type: 'Secar', number: 1 },
    { name: 'Lavar 2', status: 'available', timeRemaining: 0, type: 'Lavar', number: 2 },
    { name: 'Secar 2', status: 'available', timeRemaining: 0, type: 'Secar', number: 2 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMachines((prevMachines) =>
        prevMachines.map((machine) => {
          if (machine.status === 'in use') {
            if (machine.timeRemaining > 0) {
              return { ...machine, timeRemaining: machine.timeRemaining - 1 };
            } else {
              return { ...machine, status: 'available', timeRemaining: 0 };
            }
          }
          return machine;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAddTime =  (machines: MachineProps[]) => {
    setMachines(machines)
    setIsModalOpen(false);
  }

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const calculateProgress = (timeRemaining: number, totalTime: number) => {
    return (timeRemaining / totalTime) * 100;
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2, maxWidth: '800px', width: '100%', padding: 2 }}>
        {machines.map((machine) => (
          <LaundryMachineCard
            key={machine.name}
            type={machine.type}
            number={machine.number}
            status={machine.status}
            timeRemaining={machine.status === 'in use' ? formatTime(machine.timeRemaining) : undefined}
            progress={machine.status === 'in use' ? calculateProgress(machine.timeRemaining, 120) : 0}
          />
        ))}
      </Box>

      <TimeMachineModal
        isModalOpen={isModalOpen}
        closeModal={() => handleClose()}
        machines={machines}
        onSave={handleAddTime}
      />
      <RoundedButton variant="contained" onClick={() => setIsModalOpen(true)}>
        <Add />
      </RoundedButton>
    </Box>
  );
};

export default LaundryStatus;
