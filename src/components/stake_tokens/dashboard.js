import React, { Component } from "react";
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import TokenIcon from '@mui/icons-material/Token';
import DiamondIcon from '@mui/icons-material/Diamond';
import StarsIcon from '@mui/icons-material/Stars';
import { CosmWasm_Client } from '../../core/cosmwasm_client';
import Cookies from 'js-cookie'
import { Stake_Tokens_Modal_Dashboard } from "./modal_stake_tokens_dashboard"
import { Revoke_Tokens_Modal_Dashboard } from "./modal_undelegate_tokens_dashboard"
import { Claim_Tokens_Modal } from "./modal_claim_rewards"
import { Staked_validators } from './test_validators_data';


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

const theme = createTheme({
    typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 26,
    },
});

export default class DashBoard extends Component {

    constructor() {
        super();
        this.state = {
            balance: 0,
            staked_tokens: 0,
            availible_rewards: 0
        };
      }
    
    async componentDidMount() {

        const cookies_user_adress = Cookies.get("userAddress")

        if (cookies_user_adress){

            const account_info = await new CosmWasm_Client().get_account_info(cookies_user_adress)
            
            console.log("---------> ACCOUNT INFO ")
            console.log(account_info)

            this.setState({balance: account_info.balance})

            const staked_tokens_numbers = Staked_validators.map(validator=> {return Number(validator.staked_amount)})

            const all_staked_tokens = staked_tokens_numbers.reduce((validator_1,validator_2 ) => {

                console.log("reduce 1arg", validator_1, "second", validator_2)

                return validator_1 + validator_2
            });

            this.setState({staked_tokens: all_staked_tokens})
        }
    }

    render(){
        return(   
            <div className='container'>
                <div className='row'>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                        <Grid item xs={7}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ width: '100%' }}>
                                    <Item>
                                        <Stack spacing={2}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={5}>
                                                    <Tokens_Item>
                                                        <Final_Item>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={9}>
                                                                    <Typography theme={theme}> Availible Tokens</Typography>
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    <TokenIcon sx={{ fontSize: 30 }}></TokenIcon>
                                                                </Grid>
                                                            </Grid>
                                                        </Final_Item>
                                                    </Tokens_Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Internal_Item>
                                                        <Final_Item>
                                                            <Typography theme={theme}> {this.state.balance}</Typography>
                                                        </Final_Item>
                                                    </Internal_Item>
                                                </Grid>
                                                <Grid item xs={3}>

                                                    <Stake_Tokens_Modal_Dashboard data={this.state.balance}/>

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
                                                        <Final_Item>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={9}>
                                                                    <Typography theme={theme}> Staked Tokens</Typography>
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    <DiamondIcon sx={{ fontSize: 30 }}></DiamondIcon>
                                                                </Grid>
                                                            </Grid>
                                                        </Final_Item>
                                                    </Tokens_Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Internal_Item>
                                                        <Final_Item>
                                                            <Typography theme={theme}> {this.state.staked_tokens}</Typography>
                                                        </Final_Item>
                                                    </Internal_Item>
                                                </Grid>
                                                <Grid item xs={3}>

                                                    <Revoke_Tokens_Modal_Dashboard data={this.state.staked_tokens}/>

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
                                                        <Final_Item>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={9}>
                                                                    <Typography theme={theme}> Availible Rewards</Typography>
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    <StarsIcon sx={{ fontSize: 30 }}></StarsIcon>
                                                                </Grid>
                                                            </Grid>
                                                        </Final_Item>
                                                    </Tokens_Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Internal_Item>
                                                        <Final_Item>
                                                            <Typography theme={theme}> {this.state.availible_rewards}</Typography>
                                                        </Final_Item>
                                                    </Internal_Item>
                                                </Grid>
                                                <Grid item xs={3}>

                                                    <Claim_Tokens_Modal data={this.state.availible_rewards} />

                                                </Grid>
                                            </Grid>
                                        </Stack>
                                    </Item>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
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
                </div>
            </div>
        )
    }
}
