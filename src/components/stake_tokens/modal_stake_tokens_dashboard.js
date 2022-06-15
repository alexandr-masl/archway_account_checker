import * as React from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { All_validators } from './test_validators_data';
import { Signed_CosmWasm_Client } from '../../core/signed_cosmwasm_client'
import { ConstantineInfo } from '../../chain.info.constantine';
import { ColorButton, GreyButton } from "./buttons_set"



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

export const Stake_Tokens_Modal_Dashboard = (props) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [validator_name_input_value, setValidatorInputValue] = React.useState('');
    const [delegated_amount_input_value, setTokensInputValue] = React.useState(0);

    const delegate_tokens = async() => {
        
        if (props.data){   

            handleOpen()

            // let offlineSigner = await window.getOfflineSigner(ConstantineInfo.chainId)

            // const sent_tokens = await new Signed_CosmWasm_Client().send_tokens("archway1ms4pgv3umf52rjy6zu5rqgyfsaemr6e9yg5y4w", "archwayvaloper1t3zrk2vva33ajcut0rvjrtxchlynx7j5mmgj8m", 123, offlineSigner)

            // console.log("======= SENT TOKENS ================")
            // console.log(sent_tokens)
        }
    }

    const close_modal = async()=>{

        setValidatorInputValue("")
        setTokensInputValue(0)
        handleClose()
    }

    const delegate_button = (

        (validator_name_input_value.length && delegated_amount_input_value) ?
           ( <div>
                <ColorButton 
                    variant="contained" 
                    style={{maxWidth: '170px', maxHeight: '130px', minWidth: '160px', minHeight: '45px'}}
                    onClick={(data) => delegate_tokens(data)}
                >
                    Stake

                </ColorButton>
            </div>)
        :
            (<div>
                <Button 
                    variant="outlined" 
                    style={{maxWidth: '170px', maxHeight: '130px', minWidth: '160px', minHeight: '45px', borderRadius: "15px"}} disabled>

                        Stake
                </Button>
            </div>)
    )

    const stake_button = (

        (props.data) ?

            <ColorButton 
                variant="contained" 
                onClick={delegate_tokens}                    
                style={{maxWidth: '170px', maxHeight: '130px', minWidth: '90px', minHeight: '50px'}}
            >
                <Typography variant="h4" component="div" color="#f5f5f5">
                    Stake
                </Typography>

            </ColorButton>
        :
            <GreyButton 
                variant="contained" 
                onClick={delegate_tokens}                    
                style={{maxWidth: '170px', maxHeight: '130px', minWidth: '90px', minHeight: '50px'}}
            >
                <Typography variant="h4" component="div" color="#f5f5f5">
                    Stake
                </Typography>

            </GreyButton>
    )


    return (
        <div>
            {stake_button}
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
                                options={All_validators}
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
                            {delegate_button}
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    )
}