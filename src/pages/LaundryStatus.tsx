import { LocalizationProvider, TimeClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

const LaundryStatus: React.FC = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T01:30'));

  const handleTimer = (newValue: Dayjs | null) => {
    setValue(newValue);
    console.log('Novo valor selecionado:', newValue?.format('HH:mm'));
  };


  return (
    <div className="flex flex-col items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Laundry Status</h2>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeClock
            views={['hours', 'minutes']}
            ampm={false}
            value={value}
            onChange={handleTimer}
          />
        </LocalizationProvider>

        {value && (
          <p className="mt-4 text-lg">
            Você selecionou {value.format('HH:mm')}
          </p>
        )}
      </div>
    </div>
  );
};

export default LaundryStatus;
