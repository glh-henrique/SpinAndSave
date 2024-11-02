import React from 'react';
import { Box, Typography, Divider, Card, styled } from '@mui/material';
import { getCurrentMonth } from '../utils';
import { IExpenseSummaryProps } from '../utils/interfaces';

const CustomCard = styled(Card)({
  borderRadius: 0
});

const CustomBox = styled(Box)({
  display: 'flex',
  alignItems: "center",
  justifyContent: "space-between",
  padding: '24px'
});

const Span = styled('span')({
  fontWeight: 'bold'
});

const ExpenseSummary: React.FC<IExpenseSummaryProps> = ({ month, washing, drying }) => {
  const total = washing + drying;

  return (
    <CustomCard>
      <CustomBox>
        <Box flex="1">
          <Typography variant="subtitle1">
            {month ?  (<Span>{month.toUpperCase()}</Span>) : ( <> Mês corrente: <Span>{getCurrentMonth()}</Span></>)}
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
      </CustomBox>
    </CustomCard>
  );
};

export default ExpenseSummary;
