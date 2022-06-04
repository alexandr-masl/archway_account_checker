import * as React from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
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

export const Claim_Tokens_Modal = (props) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [claim_amount_input_value, setTokensInputValue] = React.useState(0);

    const undelegate_tokens = async() => {

        if (props.data)
            handleOpen()
    }

    const close_modal = async()=>{

        setTokensInputValue(0)
        handleClose()
    }

    const modal_claim_button = (

        (claim_amount_input_value) ?

            <ColorButton 
                variant="contained" 
                style={{maxWidth: '170px', maxHeight: '130px', minWidth: '160px', minHeight: '45px'}}
                onClick={(data) => undelegate_tokens(data)}
            >
                Claim

            </ColorButton>
        :
            <Button 
                variant="outlined" 
                style={{maxWidth: '170px', maxHeight: '130px', minWidth: '160px', minHeight: '45px'}} disabled
            >

                Claim

            </Button>
    )

    const main_claim_button = (

        (props.data) ?

            <ColorButton 
                variant="contained" 
                onClick={undelegate_tokens}                    
                style={{maxWidth: '170px', maxHeight: '130px', minWidth: '90px', minHeight: '50px'}}
            >
                <Typography variant="h4" component="div" color="#f5f5f5">
                    Claim
                </Typography>

            </ColorButton>
        :
            <GreyButton 
                variant="contained" 
                onClick={undelegate_tokens}                    
                style={{maxWidth: '170px', maxHeight: '130px', minWidth: '90px', minHeight: '50px'}}
            >
                <Typography variant="h4" component="div" color="#f5f5f5">
                    Claim
                </Typography>

            </GreyButton>
    )


    return (
        <div>
            {main_claim_button}
            <Modal
                open={open}
                onClose={close_modal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container rowSpacing={2} >
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
                            {modal_claim_button}
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    )
}