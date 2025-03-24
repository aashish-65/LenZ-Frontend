// components/ServiceUnavailableBanner.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Fade, Grow } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import ScheduleIcon from '@mui/icons-material/Schedule';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

// Animations
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(211, 47, 47, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(211, 47, 47, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(211, 47, 47, 0);
  }
`;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0px);
  }
`;

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  overflow: 'hidden',
  borderRadius: '12px',
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(211, 47, 47, 0.2)',
  width: '100%',
  maxWidth: '1200px',
  marginBottom: theme.spacing(4),
  position: 'relative',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 10px 25px rgba(211, 47, 47, 0.15)',
  },
}));

const ColorBar = styled('div')({
  height: '4px',
  background: 'linear-gradient(90deg, #d32f2f 0%, #ff6659 50%, #d32f2f 100%)',
  backgroundSize: '200% 200%',
  width: '100%',
  animation: `${gradientShift} 3s ease infinite`,
});

const BannerContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5, 3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    textAlign: 'center',
    padding: theme.spacing(2),
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${float} 3s ease-in-out infinite`,
  [theme.breakpoints.down('sm')]: {
    marginRight: 0,
    marginBottom: theme.spacing(1.5),
  },
}));

const StyledIcon = styled(InfoOutlinedIcon)(({ theme }) => ({
  fontSize: '2.5rem',
  color: '#d32f2f',
}));

const TimeIcon = styled(ScheduleIcon)({
  fontSize: '1.2rem',
  marginRight: '8px',
  verticalAlign: 'middle',
  color: '#d32f2f',
});

const ClockIcon = styled(WatchLaterIcon)(({ active }) => ({
  fontSize: '1.2rem',
  color: '#d32f2f',
  animation: active ? `${blink} 1.5s ease-in-out infinite` : 'none',
}));

const TimeHighlight = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(1),
  backgroundColor: 'rgba(211, 47, 47, 0.08)',
  padding: theme.spacing(0.75, 1.5),
  borderRadius: '4px',
  width: 'fit-content',
  animation: `${pulse} 2s infinite`,
  position: 'relative',
  overflow: 'hidden',
}));

const ServiceUnavailableBanner = () => {
  const [visible, setVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Animation entrance effect
  useEffect(() => {
    setVisible(true);
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  const getServiceRestartTime = () => {
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(currentTime.getTime() + istOffset);
  
    const hours = istTime.getUTCHours();
  
    if (hours >= 20) {
      return "10 AM tomorrow";
    } else if (hours < 10) {
      return "10 AM today";
    }
    return null;
  };
  
  const restartTime = getServiceRestartTime();
  
  // Don't show banner during service hours
  if (!restartTime) return null;

  // Countdown calculation (example)
  const getTimeRemaining = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istNow = new Date(now.getTime() + istOffset);
    
    let targetHour = 10; // 10 AM
    let targetDay = istNow.getUTCDate();
    
    if (istNow.getUTCHours() >= 10) {
      targetDay = istNow.getUTCDate() + 1;
    }
    
    const targetDate = new Date(Date.UTC(
      istNow.getUTCFullYear(),
      istNow.getUTCMonth(),
      targetDay,
      targetHour - 5, // Adjust for IST offset in hours
      30 - 30, // Adjust for IST offset in minutes
      0
    ));
    
    const timeDiff = targetDate - now;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <Fade in={visible} timeout={800}>
      <StyledPaper elevation={0}>
        <ColorBar />
        <BannerContent>
          <Grow in={visible} timeout={1200}>
            <IconWrapper>
              <StyledIcon />
            </IconWrapper>
          </Grow>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="h2" sx={{ 
              fontWeight: 600, 
              color: '#d32f2f',
              mb: 0.5,
              fontSize: { xs: '1rem', sm: '1.1rem' }
            }}>
              Service Unavailable
            </Typography>
            <Typography variant="body1" sx={{ 
              color: 'rgba(0, 0, 0, 0.7)',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              lineHeight: 1.5
            }}>
              Our service is currently unavailable as it ends after 8 PM IST.
            </Typography>
            <TimeHighlight>
              <TimeIcon />
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#d32f2f', mr: 2 }}>
                Service restarts at {restartTime}
              </Typography>
              <ClockIcon active={true} />
              <Typography variant="body2" sx={{ 
                fontWeight: 500, 
                color: '#d32f2f', 
                ml: 0.5,
                animation: `${blink} 1.5s ease-in-out infinite`
              }}>
                ({getTimeRemaining()})
              </Typography>
            </TimeHighlight>
          </Box>
        </BannerContent>
      </StyledPaper>
    </Fade>
  );
};

export default ServiceUnavailableBanner;