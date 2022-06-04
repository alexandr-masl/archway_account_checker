import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { orange } from '@mui/material/colors';
import { grey } from '@mui/material/colors';

export const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    borderRadius: "15px",
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
}));

export const GreyButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[900]),
    borderRadius: "15px",
    backgroundColor: grey[300],
    '&:hover': {
      backgroundColor: grey[400],
    },
}));