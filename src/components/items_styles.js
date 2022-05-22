import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';



export const Tokens_Item = styled(Paper)(({ theme }) => ({

    color: theme.palette.primary.contrastText,
    backgroundColor: "#f66e49",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: "15px",
    fontSize: '1.2rem',
}));

export const Internal_Item = styled(Paper)(({ theme }) => ({

    color: theme.palette.primary.contrastText,
    backgroundColor: '#f66e49',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#fff',
    borderRadius: "15px",
    fontSize: '1.2rem',
}));

export const Item = styled(Paper)(({ theme }) => ({

    color: theme.palette.primary.contrastText,
    backgroundColor: "#e0e0e0",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: "15px",
    fontSize: '1.2rem',
}));

export const Final_Item = styled(Paper)(({ theme }) => ({

    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.contrastText,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    borderRadius: "15px",
    fontSize: '1.2rem',
}));

export const Button_Item = styled(Paper)(({ theme }) => ({

    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.contrastText,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    borderRadius: "15px",
    fontSize: '2.7rem',
}));

export const Main_Item = styled(Paper)(({ theme }) => ({

    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.contrastText,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: "15px",
    fontSize: '1.2rem',
}));