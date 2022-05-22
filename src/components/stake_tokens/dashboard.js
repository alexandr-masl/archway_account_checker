import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Stake_Tokens_Modal_Dashboard } from "./modal_stake_tokens_dashboard"



export default function DashBoard() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const Tokens_Item = styled(Paper)(({ theme }) => ({

        color: theme.palette.primary.contrastText,
        backgroundColor: "#f66e49",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: "15px",
        fontSize: '1.2rem',
    }));

    const Internal_Item = styled(Paper)(({ theme }) => ({

        color: theme.palette.primary.contrastText,
        backgroundColor: '#f66e49',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: '#fff',
        borderRadius: "15px",
        fontSize: '1.2rem',
    }));

    const Item = styled(Paper)(({ theme }) => ({

        color: theme.palette.primary.contrastText,
        backgroundColor: "#e0e0e0",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: "15px",
        fontSize: '1.2rem',
    }));

    const Final_Item = styled(Paper)(({ theme }) => ({

        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.contrastText,
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: "15px",
        fontSize: '1.2rem',
    }));

    const Button_Item = styled(Paper)(({ theme }) => ({

        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.contrastText,
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.primary.contrastText,
        borderRadius: "15px",
        fontSize: '2.7rem',
    }));

    const Main_Item = styled(Paper)(({ theme }) => ({

        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.contrastText,
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: "15px",
        fontSize: '1.2rem',
    }));

    return (

        <div className='container'>
            <div className='row'>
                {/* <Card sx={{ display: 'flex', borderRadius: "15px", color: "#ffbb66" }}> */}
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                        <Grid item xs={6}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ width: '100%' }}>
                                    <Main_Item>
                                        <Item>
                                            <Stack spacing={2}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={5}>
                                                        <Tokens_Item>
                                                            <Final_Item>Availible Tokens</Final_Item>
                                                        </Tokens_Item>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Internal_Item>
                                                            <Final_Item>0.0</Final_Item>
                                                        </Internal_Item>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Button_Item>

                                                            <Stake_Tokens_Modal_Dashboard />

                                                        </Button_Item>
                                                    </Grid>
                                                </Grid>
                                            </Stack>
                                        </Item>
                                        <p></p>
                                        <Item>
                                            <Stack spacing={2}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={5}>
                                                        <Tokens_Item>
                                                            <Final_Item>Staked Tokens</Final_Item>
                                                        </Tokens_Item>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Internal_Item>
                                                            <Final_Item>0.0</Final_Item>
                                                        </Internal_Item>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Button_Item>
                                                            <Button>Unstake</Button>
                                                        </Button_Item>
                                                    </Grid>
                                                </Grid>
                                            </Stack>
                                        </Item>
                                        <p></p>
                                        <Item>
                                            <Stack spacing={2}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={5}>
                                                        <Tokens_Item>
                                                            <Final_Item>Availible Rewards</Final_Item>
                                                        </Tokens_Item>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Internal_Item>
                                                            <Final_Item>0.0</Final_Item>
                                                        </Internal_Item>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Button_Item>
                                                            <Button>Claim</Button>
                                                        </Button_Item>
                                                    </Grid>
                                                </Grid>
                                            </Stack>
                                        </Item>
                                    </Main_Item>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h2">
                                        Stake-Dashboard
                                    </Typography>
                                    <Typography variant="h3" color="text.secondary" component="div">
                                        Stake your tokens and withdraw rewards
                                    </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                {/* </Card> */}
            </div>
        </div>
  );
}
