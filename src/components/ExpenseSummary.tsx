import React from 'react';
import { Box, Typography, Divider, Card } from '@mui/material';
import { getCurrentMonth } from '../utils';

interface ExpenseSummaryProps {
  washing: number;
  drying: number;
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ washing, drying }) => {
  const total = washing + drying;

  return (
    <Card sx={{ maxWidth: '1600px', borderRadius: 0 }}>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 2 }}
      >
        <Box flex="1">
          <Typography variant="subtitle1">
            Mês corrente: <span style={{ fontWeight: 'bold' }}>{getCurrentMonth()}</span>
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2">Lavagem: {washing} euros</Typography>
          <Typography variant="body2">Secagem: {drying} euros</Typography>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

        <Box flex="0.5" textAlign="center">
          <Typography variant="subtitle1">Total</Typography>
          <Typography variant="h3" fontWeight="bold">
            {total} €
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default ExpenseSummary;
