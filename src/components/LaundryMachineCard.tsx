import type React from 'react';
import { Box, Typography, Paper, CircularProgress, type CircularProgressProps, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

interface LaundryMachineCardProps {
  type: "Lavar" | "Secar"
  number: number
  status: 'in use' | 'available' | 'idle';
  timeRemaining?: string;
  progress?: number;
}

const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "status",
})<{ status: 'in use' | 'available' | 'idle' }>(({ theme, status }) => ({
  width: 220,
  height: 280,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  border: status === "in use" ? '1px solid red' : '1px solid green',
  borderRadius: 0,
  position: 'relative',
  backgroundColor:
    status === "in use"
      ? theme.palette.error.light
      : status === "available"
        ? theme.palette.success.light
        : theme.palette.background.paper,
}))

const TitleContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
})

const Divider = styled(Box)({
  width: '100%',
  height: 2,
  backgroundColor: 'white',
  marginTop: 4,
})

function CircularProgressWithLabel(props: CircularProgressProps & { value: number; label: React.ReactNode; status: string }) {
  const theme = useTheme();
  const circleColor = props.status === 'in use' ? theme.palette.error.main : props.status === 'available' ? theme.palette.success.main : theme.palette.text.secondary;
  const textColor = circleColor;

  const circleBackGroundColor = '#e0e0e0'

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant='determinate'
        value={100}
        size={140}
        thickness={1.5}
        sx={{ color: circleBackGroundColor, position: 'absolute', animation: 'none' }}
      />
      <CircularProgress variant='determinate' value={props.value} size={140} thickness={1.5} sx={{ color: circleColor }} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant='h6' component='div' color={textColor}>
          {props.label}
        </Typography>
      </Box>
    </Box>
  );
}

export const LaundryMachineCard: React.FC<LaundryMachineCardProps> = ({
  type,
  number,
  status,
  timeRemaining,
  progress = 0,
}) => {
  const getCircleContent = () => {
    if (status === 'in use' && timeRemaining) {
      return timeRemaining;
    }
    if (status === 'available' || status === 'idle') {
      return 'Available';
    }
    return '';
  };

  const statusText = status === 'in use' ? 'in use' : '';

  return (
    <StyledPaper elevation={2} status={status}>
      <TitleContainer>
        <Typography variant="h6" component="div" fontWeight="bold">
          {type} {number}
        </Typography>
        {status === 'in use' && (
          <Typography variant="body2" component="div">{statusText}</Typography>
        )}
      </TitleContainer>
      <Divider />

      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
        <CircularProgressWithLabel value={progress} label={getCircleContent()} status={status} />
      </Box>
    </StyledPaper>
  );
};
