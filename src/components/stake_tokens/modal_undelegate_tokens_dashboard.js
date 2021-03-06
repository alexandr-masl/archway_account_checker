import * as React from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Staked_validators } from './test_validators_data';
import { ColorButton, GreyButton } from "./buttons_set"
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

    const close_modal = async()=>{

        setValidatorInputValue("")
        setTokensInputValue(0)
        handleClose()
    }

    const undelegate_button = (

        (validator_name_input_value.length && undelegated_amount_input_value) ?
            <ColorButton 
                variant="contained" 
                style={{maxWidth: '170px', maxHeight: '130px', minWidth: '160px', minHeight: '45px'}}
                onClick={(data) => undelegate_tokens(data)}
            >
                Revoke

            </ColorButton>

        :
            <Button 
                variant="outlined" 
                style={{maxWidth: '170px', maxHeight: '130px', minWidth: '160px', minHeight: '45px', borderRadius: "15px"}} disabled>

                    Revoke
            </Button>
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
            <GreyButton 
                variant="contained" 
                onClick={undelegate_tokens}                    
                style={{maxWidth: '170px', maxHeight: '130px', minWidth: '90px', minHeight: '50px'}}
            >
                <Typography variant="h4" component="div" color="#f5f5f5">
                    Revoke
                </Typography>

            </GreyButton>
    )


    return (
        <div>
            {revoke_button}
            <Modal
                open={open}
                onClose={close_modal}
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