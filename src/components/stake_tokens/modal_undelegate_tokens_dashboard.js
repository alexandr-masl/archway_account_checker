import * as React from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import { grey } from '@mui/material/colors';
import { Staked_validators } from './test_validators_data';
import { Signed_CosmWasm_Client } from '../../core/signed_cosmwasm_client'
import { ConstantineInfo } from '../../chain.info.constantine';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'background.paper',
  boxShadow: 24,
  borderRadius: "15px",
  p: 4,
};

export const Revoke_Tokens_Modal_Dashboard = (props) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [validator_name_input_value, setValidatorInputValue] = React.useState('');
    const [undelegated_amount_input_value, setTokensInputValue] = React.useState(0);

    const undelegate_tokens = async() => {

        if (props.data)
            handleOpen()
    }

    console.log("--- Revoke_Tokens_Modal_Dashboard DATA", props.data)

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(orange[100]),
        borderRadius: "15px",
        backgroundColor: orange[100],
        '&:hover': {
          backgroundColor: orange[500],
        },
    }));

    const GrayButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(grey[900]),
        borderRadius: "15px",
        backgroundColor: grey[300],
        '&:hover': {
          backgroundColor: grey[400],
        },
    }));

    const undelegate_button = (

        (validator_name_input_value.length && undelegated_amount_input_value) ?
           ( 
               <div>
                    <ColorButton 
                        variant="contained" 
                        style={{maxWidth: '170px', maxHeight: '130px', minWidth: '160px', minHeight: '45px'}}
                        onClick={(data) => undelegate_tokens(data)}
                    >
                        Revoke

                    </ColorButton>
                </div>
            )
        :
            (<div>
                <Button 
                    variant="outlined" 
                    style={{maxWidth: '170px', maxHeight: '130px', minWidth: '160px', minHeight: '45px'}} disabled>

                        Revoke
                </Button>
            </div>)
    )

    const revoke_button = (

        (props.data) ?

            <ColorButton 
                variant="contained" 
                onClick={undelegate_tokens}                    
                style={{maxWidth: '170px', maxHeight: '130px', minWidth: '90px', minHeight: '50px'}}
            >
                <Typography variant="h4" component="div" color="#f5f5f5">
                    Revoke
                </Typography>

            </ColorButton>
        :
            <GrayButton 
                variant="contained" 
                onClick={undelegate_tokens}                    
                style={{maxWidth: '170px', maxHeight: '130px', minWidth: '90px', minHeight: '50px'}}
            >
                <Typography variant="h4" component="div" color="#f5f5f5">
                    Revoke
                </Typography>

            </GrayButton>
    )


    return (
        <div>
            {revoke_button}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container rowSpacing={2} >
                        <Grid item xs={9}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={Staked_validators}
                                sx={{ width: 300 }}
                                onChange={(event, newInputValue) => {
                                    setValidatorInputValue((newInputValue ? newInputValue.label : ""));
                                }}
                                renderInput={(params) => <TextField {...params} label="Validator Name" />}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField 
                                onChange={(event)=>{setTokensInputValue(event.target.value)}}
                                id="outlined-basic" 
                                label="Tokens Amount" 
                                variant="outlined" 
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            {undelegate_button}
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    )
}